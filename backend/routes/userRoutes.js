// import
const router = require('express').Router();
const userController = require("../controllers/userControllers")
const bookingController = require("../controllers/bookingcontrollers")
const contactController = require("../controllers/contactControllers")

// create user api
router.post('/create', userController.createUser)

//  task 1: create login api
router.post('/login', userController.loginUser)

router.get("/get_user/:id", userController.getSingleUser)

router.post("/create_booking", bookingController.createBooking),
router.get("/get_booking", bookingController.getAllBooking),

router.get("/get_userBooking/:id", bookingController.getBookingsByUser),

// update the user
router.put('/update_user/:id', userController.updateUser);

router.post('/forgetpassword', userController.forgetPassword);
router.post('/contact_us', contactController.createContact);

// exporting
module.exports = router;