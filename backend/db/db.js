import mongoose from "mongoose";

export default async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Conneted to the database")
    }).catch(err=>console.error(err.message))
}