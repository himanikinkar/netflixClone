const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

//Create
router.post('/', verify, async (req,res)=> {
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);
        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("you are not allowed");
    }
});
//update
router.put('/:id', verify, async (req,res) => {
    if(req.user.isAdmin){
        // const newMovie = new Movie(req.body);

        try{
            const UpdatedMovie = await newMovie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            res.status(201).json(UpdatedMovie);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json('You are not allowed');
    }
});

//Delete

router.delete("/:id", verify, async (req,res)=> {
    if(req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("the movie has been deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("you are not allowed");
    }
});

//Get

router.get("/find/:id", verify, async (req,res)=> {
            
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
}
        catch(err){
            res.status(500).json(err);
        }
});

//Get random 

router.get("/random", verify, async (req,res)=> {
        const type = req.query.type;
        try {
            let movie;
            // const movie = await Movie.findById(req.params.id);
            // res.status(200).json(movie);
            if(type === 'series'){
                movie = await Movie.aggregate([
                    {$match : {isSeries: true}},
                    {$sample: {size: 1}},
                ]);
            }else{
                movie = await Movie.aggregate([
                    {$match : {isSeries: false}},
                    {$sample: {size: 1}},
                    
                ])
            }
            res.status(200).json(movie);
        }
        catch(err){
            res.status(500).json(err);
        }
    
});

//Get all
router.get("/", verify, async (req,res)=> {
    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("you are not allowed");
    }
});


module.exports = router;