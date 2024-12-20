import { RequestHandler} from 'express'
import { getAllProducts , filterProducts } from '../models/products.model'

export const gethome:RequestHandler = async (req , res , next)=>{
    if(req.query.search && req.query.search.toString().trim() !== ""){
        try{
            const products = await filterProducts(req.query.search as string);
            res.render('index' , {products : products});
        }catch(err){
            console.error("can't fetch products : ",err);
        }
    }
    else{
        try{
            const products = await getAllProducts();
            res.render('index' , {products : products});
        }catch(err){
            console.error("can't fetch products : ",err);
        }
    }
};
