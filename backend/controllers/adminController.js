const Destinations = require('../model/destinationModel');
const cloudinary = require('cloudinary');


const createDestination = async (req, res) => {
    // step 1 : Check incomming data
    console.log(req.body);
    console.log(req.files);

    // step:2 destructuring
    const { destinationName, price, district, description, map } = req.body;

    const { destinationImage } = req.files;

    // step 3 : validate the data
    if (!destinationImage || !destinationName || !price || !district || !description || !map) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : upload image to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            destinationImage.path,
            {
                folder: "destinations",
                crop: "scale"
            }
        )

        // save the products
        const newDestination = new Destinations({
            destinationName: destinationName,
            price: price,
            district: district,
            description: description,
            destinationImageUrl: uploadedImage.secure_url,
            map: map
        })
        await newDestination.save();
        res.status(200).json({
            success: true,
            message: "Destination created successfully",
            data: newDestination
        })


    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }

}


// // const getAllFutsalsbyUserId = async (req,res) => {
// //     const id = req.params.id;
// //     if(!id){
// //         return res.json({
// //             success: false,
// //             message: "Futsal ID is required"
// //         })
// //     }

// //     try {
// //         const listOfFutsals = await Futsals.find({user:id});
// //         return res.json({
// //             success : true,
// //             message : "Futsal fetched successfully",
// //             futsals : listOfFutsals
// //         })

// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json("Server Error")
// //     }   
// // }


// // // function for getting all products
const getAllDestination = async (req, res) => {
    try {
        const page = parseInt(req.query._page, 10);
        const limit = parseInt(req.query._limit, 10);
        if (page !== undefined && limit !== undefined) {
            const skip = (page - 1) * limit;
            const listOfDestinations = await Destinations.find().skip(skip).limit(limit);
            const recentDestination = await Destinations.find().limit(3)

            return res.status(200).json({
                success: true,
                destinations: listOfDestinations,
                recent: recentDestination,
                message: "Fetched destinations successfully",
            })
        }
        const listOfDestinations = await Destinations.find();
        const recentDestination = await Destinations.find().sort({ _id: -1 }).limit(3)
        return res.status(200).json({
            success: true,
            message: "Destinations fetched successfully",
            destinations: listOfDestinations,
            recent: recentDestination
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
}

const getDestinationById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const destinationData = await Destinations.findById(id)
        res.status(200).json({
            success: true,
            message: 'Single Destination fetched successfully',
            destination: destinationData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Check log there is a problem',
        })
    }
}

const youMayLike = async (req, res) => {
    const id = req.params.id;
    try {
        const destinationData = await Destinations.find({ _id: { $ne: id } }).sort({ _id: -1 }).limit(3);
        res.status(200).json({
            success: true,
            message: 'You may like data fetched!',
            likeData: destinationData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Check log for error.'
        })
    }
}
const updateDestination = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.files);

    const{
        destinationName,
        price,
        description,
        district,
        map,
        
    } = req.body;

    const {destinationImageUrl} = req.files;

    // destructure id from URL
     const id = req.params.id

    if(!destinationName || !price ||!district||!description || !map ){
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }
    try{
        if(destinationImageUrl){
            const uploadedImage = await cloudinary.v2.uploader.upload(
                destinationImageUrl.path,
                {
                    folder: "destinations",
                    crop: "scale"
                }
            )

            // update the product
            const updatedDestination = {
                destinationName: destinationName,
                price : price,
                district:district,
                description: description,
                map: map,
                destinationImageUrl: uploadedImage.secure_url,
            }
            await Destinations.findByIdAndUpdate(id, updatedDestination);
            res.json({
                success: true,
                message: "Destination Updated Successfully",
                destination: updatedDestination
            })
        }
        else{
            // update the futsal
            const updatedDestination = {
                destinationName: destinationName,
                price : price,
                district:district,
                description: description,
                map: map,
            }
            await Destinations.findByIdAndUpdate(id, updatedDestination);
            res.json({
                success: true,
                message: "Destination Updated Successfully without Image",
                destination: updatedDestination
            })
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}
const deleteDestination = async (req,res)=>{
    try{
        const deletedDestination = await Destinations.findByIdAndDelete(req.params.id);
        if(!deletedDestination){
            res.json({
                success: false,
                message: "Destination Not Found"
            })
        }
        res.json({
            success: true,
            message:"Destination Deleted Successfully"
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }
}
// // //  get product by id

// // const getSingleFutsal = async(req,res)=>{
// //     const id = req.params.id;
// //     if(!id){
// //         return res.json({
// //             success: false,
// //             message: "Futsal ID is required"
// //         })
// //     }

// //     try{
// //         const singleFutsal = await Futsals.findById(id);
// //        return res.json({
// //             success: true,
// //             message: "Futsal fetched Successfully",
// //             futsal: singleFutsal
// //         })

// //     }
// //     catch(error){
// //         console.log(error);
// //         res.status(500).json("Server Error")

// //     }

// // }

// // // update product

// // // delete product  

module.exports = {
    createDestination, getAllDestination, getDestinationById, youMayLike,updateDestination,deleteDestination

}