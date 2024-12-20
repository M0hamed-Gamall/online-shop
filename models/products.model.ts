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

export const getAllProducts = async ():Promise<Document<IProduct>[]>=>{
    let products:Document<IProduct>[] = [];
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected in getAllProducts");
        products = await Products.find();
        await mongoose.disconnect();
        console.log("database disconnected in getAllProducts ")
    }catch(err){
        console.log("can't connect database in getAllProducts : " , err);
    }finally{
        return products;
    }
}

export const filterProducts = async (keyword:string):Promise<Document<IProduct>[]>=>{
    let products:Document<IProduct>[] = [];
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected in filterProducts");
        products = await Products.find({ $text : { $search: keyword }});
        await mongoose.disconnect();
        console.log("database disconnected in filterProducts")
    }catch(err){
        console.log("can't connect database in filterProducts : " , err);
    }finally{
        return products;
    }
}

export const getPeoductById = async(id:string):Promise<IProduct|null>=>{
    let product:IProduct|null = null;
    try{
        await mongoose.connect(DB_URL);
        console.log("database connected in getPeoductById");
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
          }
        product = await Products.findById(id);
        console.log("database disconnected in getPeoductById")
        await mongoose.disconnect();
    }catch(err){
        console.log("can't connect database in getPeoductById : " , err);
    }finally{
        return product;
    }
}