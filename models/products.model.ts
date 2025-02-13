import {Schema , model ,Document , Types} from 'mongoose'
import { Request } from 'express'
interface IProduct extends Document {
    name: String;
    description: String;
    price: number;
    image: String,
    category: string
}

const productSchema = new Schema<IProduct>({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})

productSchema.index({ name: 'text', description: 'text' })

const Products = model<IProduct>('product' , productSchema)


export const filterProducts = async (keyword:string)=>{
    if(keyword == "") return await Products.find();
    return await Products.find({ $text : { $search: keyword }});
}

export const getProductById = async(id:string)=>{
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    return await Products.findById(id);
}

export const addproduct = async(req:Request)=>{
    let fileName = req.file?.filename ;
    let {name , price , description } = req.body

    let newProduct = new Products({name:name , price:price , description:description , image:"/"+fileName })
    newProduct.save();
}