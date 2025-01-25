import { RequestHandler} from 'express'
import { getAllProducts , filterProducts } from '../models/products.model'

export const gethome:RequestHandler = async (req , res , next)=>{
    
    try{
        const products = await filterProducts(req.query.search?.toString() || "");
        res.render('index' , {products : products});
    }catch(err){
        console.error("can't fetch products : ",err);
    }
    
    
   
    
};
