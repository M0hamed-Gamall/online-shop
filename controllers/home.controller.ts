import { RequestHandler} from 'express'
import { filterProducts } from '../models/products.model'

export const gethome:RequestHandler = async (req , res , next)=>{
    try{
        const products = await filterProducts(req.query.search?.toString() || "");
        res.render('index' , {products});
    } catch(err){
        throw new Error(`can't fetch products : ${err}`);
    }
};
