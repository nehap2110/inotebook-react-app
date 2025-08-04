const mongoose = require('mongoose');
const {Schema} = mongoose

const NotesSchema = new Schema({
   //it is like a foreign key it linked user notes with the user using his/her id
   user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
   },
   title:{
      type : String,
      required : true
   },
   description:{
    type:String,
    required : true,
    
   },
   tag:{
    type:String,
    default:"general"
   },
   date:{
    type: Date,
    default:Date.now
   }
})

module.exports = mongoose.model('notes',NotesSchema)