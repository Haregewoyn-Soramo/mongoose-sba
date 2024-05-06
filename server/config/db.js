const mongoose = require('mongoose');
const connectDB = async()=>{
  try{
    mongoose.set('strictQuery',false)
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to: ${process.env.MONGODB_URI}`)
  }catch(error){
    console.log('connection problem',error)
  }
}
module.exports = connectDB;