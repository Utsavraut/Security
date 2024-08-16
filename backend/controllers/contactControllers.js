const Contact = require("../model/contactModel");

// create review
const createContact = async (req, res) => {
  try {
    const { name, email, contact, subject, message } = req.body;

    // Create a new review
    const newContact = new Contact({
      name: name,
      contact: contact,
      email: email,
      subject: subject,
      message: message
    });

    await newContact.save();

    res.status(200).json({
      success: true,
      message: "Contact submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getContact = async(req, res)=>{
  try {
    const page = parseInt(req.query._page, 10);
    const limit = parseInt(req.query._limit, 10);
    if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;
        const listOfContact = await Contact.find().skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            contacts: listOfContact,
            message: "Fetched contacts successfully",
        })
    }
    const listOfContact = await Contact.find();
    return res.status(200).json({
        success: true,
        message: "Contacts fetched successfully",
        contact: listOfContact,
    })

} catch (error) {
    console.log(error);
    res.status(500).json("Server Error")
}

}

// fetching review of particular futsal


module.exports = {
  createContact,
  getContact
  
};
