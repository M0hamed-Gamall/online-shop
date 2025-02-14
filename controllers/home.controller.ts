import { RequestHandler} from 'express'
import { filterProducts } from '../models/products.model'

export const gethome:RequestHandler = async (req , res , next)=>{
    try{
        const products = await filterProducts(req.query.search?.toString() || "");
        res.render('index' , {products , pageTitle: "Home"});
    } catch(err){
        next(err)
    }
};
