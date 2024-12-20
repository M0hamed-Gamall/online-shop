import mongoose, {Schema , model ,Document} from 'mongoose'

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";

const productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})

productSchema.index({ name: 'text', description: 'text' })

const Products = model('product' , productSchema)

export const getAllProducts = async ():Promise<Document<unknown, any, any>[]>=>{
    let products:Document[] = [];
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected");
        products = await Products.find();
        await mongoose.disconnect();
        console.log("database disconnected")
    }catch(err){
        console.log("can't connect database : " , err);
    }finally{
        return products;
    }
}

export const filterProducts = async (keyword:string):Promise<Document<unknown, any, any>[]>=>{
    let products:Document[] = [];
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected");
        products = await Products.find({ $text : { $search: keyword }});
        await mongoose.disconnect();
        console.log("database disconnected")
    }catch(err){
        console.log("can't connect database : " , err);
    }finally{
        return products;
    }
}