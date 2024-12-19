import mongoose, {Schema , model} from 'mongoose'

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";

const productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})
const Products = model('product' , productSchema)

export const getAllProducts = async ()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected");
        const products = await Products.find();
        await mongoose.disconnect();
        return products;
    }catch(err){
        console.log("can't connect database : " , err);
    }
}
