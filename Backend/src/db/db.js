const mongoose = require("mongoose")

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.log("DB ERROR:", error);  
    }
}

module.exports = connectDb