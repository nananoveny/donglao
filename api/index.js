const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');

// const cors = require('cors'); 

dotenv.config();
app.use(express.json());
// app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
}).then(console.log("Connected to MONGODB")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "images") //dia chi luu image
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name) // ten file
        // cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});
app.post("/api/upload", upload.single('file'), (req, res)=>{
    res.status(200).json("file has been upload");
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);




app.listen("5000", ()=>{
    console.log("Backend is running.")
})