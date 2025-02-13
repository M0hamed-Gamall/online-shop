import { body , validationResult } from "express-validator"
import { RequestHandler } from "express"

const valid:RequestHandler = (req , res , next)=>{
    if (!req.file){
        req.flash("errors", ["Please upload an image"]);
    }
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors", errors.array().map((error) => error.msg)); 
        return res.redirect('/admin/add-product');
    }
    next();
}

export const productValidator = [
    body("name").notEmpty().withMessage("product name can't be empty"),
    body("price").isNumeric().withMessage("price must be a number"),
    body("description").notEmpty().withMessage("please enter the description"),
    valid
]