const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectTomongo =  async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("connected successfully");
    }
    catch(error){
        console.log("failed connection ", error);
    }
} ;

module.exports = connectTomongo;