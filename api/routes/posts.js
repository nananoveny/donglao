const router = require("express").Router();

const User = require("../models/User");
const Post = require("../models/Post");
// const cors = require('cors');

// router.use(cors());

//create post
router.post('/', async(req, res)=>{

    const newPost = new Post(req.body);
    // khi chi sai req.body thi cac key trong postman phai giong voi key trong model
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});
//update post
router.put('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new:true});

                res.status(200).json(updatedPost);

            } catch (error) {
                res.status(500).json(error);
                
            }
        }else{
            res.status(401).json("you can update only yout post")
        }
        
    } catch (error) {
        res.status(500).json(error);
        
    }
});
//delepostt

//update post
router.delete('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
               post.delete();
                res.status(200).json("The post has been delete...");

            } catch (error) {
                res.status(500).json(error);
                
            }
        }else{
            res.status(401).json("you cant delete only yout post")
        }
        
    } catch (error) {
        res.status(500).json(error);
        
    }
});
//get user
router.get("/:id", async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error);
    }
});

//get all posts
router.get("/", async(req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if(username){
            posts = await Post.find({username: username});
        }else if(catName){
            posts = await Post.find({categories: {
                $in:[catName],
            }});
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router