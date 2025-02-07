import mongoose from "mongoose";

export const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";
async function connectDatabase(){
    try{
        await mongoose.connect(DB_URL);
    } catch(err){
        throw err;
    }
}
connectDatabase();