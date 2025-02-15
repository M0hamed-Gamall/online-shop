import { Schema , model , Document } from "mongoose";
import { Request } from "express";
import { CartItems } from "./cart.model"

interface Iorder extends Document{
    name: String,
    price: Number,
    userId: String,
    productId: String,
    status: String,
    ordertime: Number,
    arrivaltime: Number
}

const orderSchema = new Schema<Iorder>({
    name: String,
    price: Number,
    userId: String,
    productId: String,
    status: {type: String , default: "pending" },
    ordertime: Number,
    arrivaltime: Number
})

const Order = model<Iorder>('order' , orderSchema);

export const getUserOrder = async(req:Request)=>{
    return await Order.find({userId : req.session.userid})
}

export const setUserOrder = async(req:Request)=>{
    let userOrders = await CartItems.find({userId : req.session.userid} , {_id:0});
    let orders = userOrders.map(order => {
        const ordertime = new Date(); 
        const arrivaltime = new Date(ordertime);
        arrivaltime.setDate(ordertime.getDate() + 3);
    
        return {
          ...order.toObject(),
          ordertime,
          arrivaltime
        };
      });
    await Order.insertMany(orders);
}

export const getPendingOrders = async()=>{
    return await Order.find({status : 'pending'});
}

export const approveOrder = async(id:string)=>{
    let order = await Order.findById(id);
    if(order){
        order.status = "approved";
        await order.save();
    }
}