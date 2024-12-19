import { RequestHandler} from 'express'
import { getAllProducts } from '../models/products.model'

export const gethome:RequestHandler = async (req , res , next)=>{
    try{
        const products = await getAllProducts();
        res.render('index' , {products : products});
    }catch(err){
        console.error("can't fetch products : ",err);
    }
};
