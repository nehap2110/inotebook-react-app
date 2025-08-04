const express =  require('express')
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body,validationResult } = require('express-validator');

//ROUTE 1 . get all the notes using ;GET /api/notes/fetchallnotes - login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
       res.json(notes);
    } catch (error) {
         console.log(error.message)
        res.status(500).send("internal server error")
    }   
})

//ROUTE 2 - add a new Note using :POST -/api/notes/addnote - login required
router.post('/addnote',fetchuser,[
     body('title','enter a valid title').isLength({min:3}),
    body('description','enter a valid description').isLength({min:5})
] ,async (req,res)=>{

    try {
        const {title,description,tag} = req.body
    // if thier are error return 404 bad request and the error
     const error = validationResult(req);
     if (!error.isEmpty()) {
     return res.status(400).json({error :error.array()});
     }
     const note = new Notes({
         title,description,tag,user:req.user.id
     })
    const savenote = await note.save()
    res.json(savenote);
    } catch (error) {
         console.log(error.message)
        res.status(500).send("internal server error")
    }
})


//ROUTE 3. Update existing note using -PUT - /updatenote - login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body
    //updated note
    const newnote = {}
    if(title){newnote.title = title}
    if(description) {newnote.description = description}
    if(tag){
        newnote.tag = tag
    }
    //find karenge note ko uski logged in user kii id se ./updatenote/:id
    let note =  await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found") // agr note exist nii kerta hai to error
    }
    //agr notes exist kerte hai  to notes k user kii id ko match krayenge requested user kii id se
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("NOT ALLOWED")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set : newnote},{new:true});
    res.json({note})


})


//ROUTE 4. delete a existing note using DELETE /deletenote

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
   
    //find karenge note ko uski logged in user kii id se ./updatenote/:id
    let note =  await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found") // agr note exist nii kerta hai to error
    }
    //agr notes exist kerte hai  to notes k user kii id ko match krayenge requested user kii id se
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("NOT ALLOWED")
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been succesfully deleted"})


})

module.exports = router