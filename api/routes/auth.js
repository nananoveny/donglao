const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require('bcrypt');

//regis
router.post('/register', async(req, res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,

        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//login
router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Wrong credentials")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials_pw")
        
        const {password, ...others} = user._doc
        //ta có {password, ...others} = user
        // lọc user 1 lần và truy cập đúng vào thông tin ta có user._doc
        // lúc này password và ...other sẽ = user._doc
        //ta sẽ lấy biến others gán vào để hiển thị json, password sẽ không dc đọc.

        res.status(200).json(others)
    } catch (err) {
        // res.status(500).json(err);
        
    }
});
module.exports = router