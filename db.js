const mongoose = require("mongoose")


const db = async() => {
    try {
        const connection = await mongoose.connect("mongodb+srv://kiruba:kiruba1997@kirubapractice.gfiyoae.mongodb.net/")
        console.log("Database Connected...")
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;