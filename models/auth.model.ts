import mongoose , {Schema , model , Document} from "mongoose";
import bcrypt from 'bcrypt'

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";

interface Iuser extends Document  {
    username: string,
    email: string,
    password: string
}

const userSchema = new Schema<Iuser>({
    username:{type: String , required: true},
    email:{type: String , required: true , unique: true},
    password:{type: String , required: true},
})

const users = model<Iuser>('user' , userSchema);

export const emailExist = async(email:string)=>{
    try{
        await mongoose.connect(DB_URL);
        let femail = await users.findOne({email});
        return !!femail;
    } catch(err){
        throw err;
    } finally{
        await mongoose.disconnect();
    }
}

export const addUser = async(user:Iuser)=>{
    try{
        await mongoose.connect(DB_URL);
        const hash = await bcrypt.hash(user.password , 10);
        const newUser = new users({username: user.username , email: user.email , password: hash})
        await newUser.save();
        await mongoose.disconnect();
    }catch(err){
        throw err;
    } finally{
        await mongoose.disconnect();
    }
}