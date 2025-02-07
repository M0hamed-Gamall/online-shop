import mongoose, {Schema , model ,Document } from 'mongoose'
import { Request } from 'express';
import { timeStamp } from 'console';
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";

interface Icart extends Document {
    name: String,
    price: number,
    userId: String,
    productId: String,
    timeStamp: Number,
}

const cartSchema = new Schema<Icart>({
    name: String,
    price: Number,
    userId: String,
    productId: String,
    timeStamp: Number
})

const CartItems = model<Icart>('cart' , cartSchema)

export const addNewItem = async(req:Request)=>{
    let {name , price , productid} = req.body;
    const newItem = new CartItems({name: name , price:price , productId:productid , userId: req.session.userid , timeStamp: Date.now() } )
    await newItem.save();
}

export const getUserItems = async (userID:String)=>{
    return await CartItems.find({userId : userID});
}

export const deleteOneItem = async(req:Request)=>{
    await CartItems.deleteOne({userId : req.session.userid , _id : req.body.id});
}