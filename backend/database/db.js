// importing any necessary packages
const mongoose = require('mongoose');

// function (Any)
const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/uiux').then(() =>{
    console.log("Connected to Database")
})
}

// export 
module.exports = connectDB;