import {Schema , model , Document} from "mongoose";
import bcrypt from 'bcrypt'


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
        let femail = await users.findOne({email});
        return !!femail;
    } catch(err){
        throw err;
    }
}

export const addUser = async(user:Iuser)=>{
    try{
        const hash = await bcrypt.hash(user.password , 10);
        const newUser = new users({username: user.username , email: user.email , password: hash})
        await newUser.save();
    }catch(err){
        throw err;
    } 
}