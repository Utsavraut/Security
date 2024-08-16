const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { authGuardAdmin } = require('../middleware/authGuard');
const bookingController = require('../controllers/bookingcontrollers');
const contactController = require("../controllers/contactControllers")

// Create product API
router.post('/createDestination', adminController.createDestination)

// // Get all products API
router.get("/getDestination", adminController.getAllDestination)

router.get('/destination/getById/:id', adminController.getDestinationById)

router.get('/destination/youMayLike/:id', adminController.youMayLike)


// // get single product api
// router.get("/get_futsals/:id", futsalController.getSingleFutsal)

// router.get("/getfutsalbyUser/:id", futsalController.getAllFutsalsbyUserId)

// // update product api
router.put('/update_destination/:id', adminController.updateDestination)

// // delete product api
router.delete("/delete_destination/:id", authGuardAdmin, adminController.deleteDestination)
router.get("/getContact", contactController.getContact)


module.exports = router;