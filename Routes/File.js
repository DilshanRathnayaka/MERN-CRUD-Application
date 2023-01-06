const router = require("express").Router();
const File = require("../Models/File")
const multer = require("multer");




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './frontend/public/uploads/');
    },
    filename: function(req, file, cb) {   
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });

//Get all
router.get("/",async(req,res)=>{
    try{
        const files = await File.find();
        res.status(200).json(files);
      
    }catch(err){
        res.status(400).json(err)
    }
})

//get specific file
router.get("/:id",async(req,res)=>{
    try{
        const files = await File.findById(req.params.id);
        res.status(200).json(files);
       
    }catch(err){
        res.status(400).json(err);
    }
})

//save file
router.post("/",upload.single("fileimage"),async(req,res)=>{
    const files = new File({
        name: req.body.name,
        category :req.body.category,
        price: req.body.price,
        disc : req.body.disc,
        image:req.file.originalname
    })
    try{
        const saved = await files.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(400).json(err);
    }
    
})

//delete file
router.delete("/:id",async(req,res)=>{
    try{
        const deleted = await File.findByIdAndDelete(req.params.id)
        res.status(200).json("File Deleted")
    }catch(err){
        res.status(400).json(err);
    }
})

//update file
router.put("/:id",upload.single("fileimage"),async(req,res)=>{
    try{
        const files = await File.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },{new:true}
            )
        res.status(200).json(files)
    }catch(err){
        res.status(400).json(err)
    }
   
})

module.exports = router;