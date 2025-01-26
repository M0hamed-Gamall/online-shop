import mongoose, {Schema , model ,Document , Types} from 'mongoose'

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";

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
    try{
        if(keyword == "") return await Products.find();
        return await Products.find({ $text : { $search: keyword }});
    }catch(err){
       throw err;
    }
}

export const getProductById = async(id:string)=>{
    try{
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
          }
        return await Products.findById(id);
    }catch(err){
        throw err;
    }
}