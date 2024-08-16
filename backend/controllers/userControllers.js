const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Utility Functions

// Password validation function
const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 12;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;

  if (password.length < minLength || password.length > maxLength) {
    return `Password must be between ${minLength} and ${maxLength} characters long.`;
  }
  if (!regex.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }
  return null;
};

// Check if the new password matches any in the user's password history
const isPasswordInHistory = async (user, newPassword) => {
  for (let history of user.passwordHistory) {
    if (await bcrypt.compare(newPassword, history.passwordHash)) {
      return true;
    }
  }
  return false;
};

// Email sending function
const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "markbase99@gmail.com",
      pass: "hwkh esmi mezr sesw",
    },
  });

  let info = await transporter.sendMail({
    from: "merojagir0@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};

// Controller Functions

// Create User
const createUser = async (req, res) => {
  console.log(req.body);
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  // Password validation
  const passwordValidationError = validatePassword(password);
  if (passwordValidationError) {
    return res.json({
      success: false,
      message: passwordValidationError,
    });
  }

  try {
    const existingUser = await Users.findOne({ userName: userName });
    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const generateSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, generateSalt);

    const newUser = new Users({
      userName: userName,
      email: email,
      password: encryptedPassword,
      passwordHistory: [{ passwordHash: encryptedPassword }], // Initialize password history
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Login User
const loginUser = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  try {
    const user = await Users.findOne({ userName: userName });
    if (!user) {
      return res.json({
        success: false,
        message: "User Does Not Exist",
      });
    }

    // Check if the account is locked
    if (user.lockUntil) {
      const lockTimeRemaining = user.lockUntil - Date.now();
      if (lockTimeRemaining > 0) {
        return res.json({
          success: false,
          message: `Account is temporarily locked. Try again in ${Math.ceil(lockTimeRemaining / 60000)} minutes.`,
        });
      } else {
        // Lock time has expired, reset lock status
        user.lockUntil = undefined;
        user.loginAttempts = 0;
        await user.save();
      }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      user.loginAttempts += 1;

      let message = "Password Does Not Match";
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 minutes
        message = "Account locked due to multiple failed attempts. Please try again later.";
      } else {
        const attemptsRemaining = 5 - user.loginAttempts;
        message = `Incorrect password. You have ${attemptsRemaining} attempt(s) remaining.`;
      }

      await user.save();
      return res.json({
        success: false,
        message: message,
      });
    }

    if ((Date.now() - new Date(user.lastPasswordChange)) > 90 * 24 * 60 * 60 * 1000) { // 90 days
      return res.json({
        success: false,
        message: "Your password has expired. Please update it.",
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET
    );

    user.loginAttempts = 0; // Reset login attempts on successful login
    user.lockUntil = undefined;
    await user.save();

    res.json({
      success: true,
      token: token,
      userData: user,
      message: "User Logged In successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};



// Update User Password
const updateUser = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.params.id;
  console.log(id);

  if (!currentPassword || !newPassword) {
    return res.json({
      success: false,
      message: "Current and new passwords are required",
    });
  }

  try {
    const user = await Users.findById({ _id: id });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect current password",
      });
    }

    // Check if the new password is in the user's password history
    const isRecentlyUsed = await isPasswordInHistory(user, newPassword);
    if (isRecentlyUsed) {
      return res.json({
        success: false,
        message: "New password must not be the same as the previous passwords",
      });
    }

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      return res.json({
        success: false,
        message: passwordValidationError,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Add current password to password history before updating
    user.passwordHistory.push({ passwordHash: user.password });

    // Update the user's password and lastPasswordChange field
    user.password = hashedNewPassword;
    user.lastPasswordChange = Date.now();
    
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single User
const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await Users.findById(id).select("-password"); // Exclude password
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

// Forget Password
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const generatedPassword = Math.random().toString(36).slice(-6);

    const salt = await bcrypt.genSalt(10);
    const hashedGeneratedPassword = await bcrypt.hash(generatedPassword, salt);

    // Add current password to password history before updating
    user.passwordHistory.push({ passwordHash: user.password });

    // Update the user's password with the generated one
    user.password = hashedGeneratedPassword;
    user.lastPasswordChange = Date.now();
    
    await user.save();

    const emailSubject = "Password Reset";
    const emailText = `Your new password is: ${generatedPassword}`;

    await sendEmail(email, emailSubject, emailText);

    res.json({
      success: true,
      message: "New password sent to your email for password reset",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Assess Password Strength (Optional)
const assessPasswordStrength = (req, res) => {
  const { password } = req.body;

  const strength = validatePassword(password);
  return res.json({
    success: true,
    message: strength || "Password is strong.",
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getSingleUser,
  forgetPassword,
  assessPasswordStrength, // Optional, add to your routes if needed
};

