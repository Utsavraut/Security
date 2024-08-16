// importing
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const multiparty = require("connect-multiparty");

// Making express app
const cloudinary = require("cloudinary");

const app = express();
const corsPolicy = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsPolicy));

cloudinary.config({
    cloud_name: "ddxughqkh",
    api_key: "163335149145581",
    api_secret: "lL9hbqDUsKYklT4n_CB2vkdZBh8",
  });

// dotenv config
dotenv.config();



// mongodb connection
connectDB();

// json middleware (to accept json data)
app.use(express.json());
app.use(multiparty());



// user routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

// defining port
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;