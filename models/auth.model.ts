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

export const emailExist = async(email:string):Promise<boolean>=>{
    let femail = undefined;
    try{
        mongoose.connect(DB_URL);
        console.log("connected to database in emilexist");
        femail = await users.findOne({email : email});
        mongoose.disconnect();
        console.log("disconnected to database in emilexist");
    }catch(err){
        console.error(err);
    }finally{
        console.log("femail : ", femail)
        if(femail){
            return true;
        }
        return false;
    }
}

export const addUser = async(username:string , email:string , password:string)=>{
    try{
        mongoose.connect(DB_URL);
        console.log("connected to database in addUser");
        const newUser = new users({username: username , email: email , password: password})
        await newUser.save();
        mongoose.disconnect();
        console.log("disconnected to database in addUser");
    }catch(err){
        console.error(err);
    }
}