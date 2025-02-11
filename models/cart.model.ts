import {Schema , model ,Document } from 'mongoose'
import { Request } from 'express';

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

export const CartItems = model<Icart>('cart' , cartSchema)

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

export const deleteAllItems = async(req:Request)=>{
    await CartItems.deleteMany({userId : req.session.userid});
}


