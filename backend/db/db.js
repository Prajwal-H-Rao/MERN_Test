const mongoose=require("mongoose")

async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Conneted to the database")
    }).catch(err=>console.error(err.message))
}

module.exports=connectToDb