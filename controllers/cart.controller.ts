import { RequestHandler } from "express";
import { addNewItem , getUserItems , deleteOneItem} from "../models/cart.model";

export const getcart:RequestHandler = async (req , res , next)=>{
    try{
        let items = await getUserItems(req.session.userid as string) 
        res.render("cart" , {cartItems : items , pageTitle:"Cart"});
    } catch(err){
        next(err);
    }
}

export const postcart:RequestHandler = async(req , res , next)=>{
    try{
        await addNewItem(req);
        res.redirect('/')
    } catch(err){
        next(err);
    }
}

export const deleteCartItem:RequestHandler = async(req , res , next)=>{
    try {
        await deleteOneItem(req);
        res.redirect('/cart');
    } catch(err){
        next(err);
    }
}
