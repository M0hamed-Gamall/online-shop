import {Schema , model , Document} from "mongoose";
import bcrypt from 'bcrypt'
import { Request } from "express";


interface Iuser extends Document  {
    username: string,
    email: string,
    password: string,
    isadmin : boolean
}

const userSchema = new Schema<Iuser>({
    username:{type: String , required: true},
    email:{type: String , required: true , unique: true},
    password:{type: String , required: true},
    isadmin : {type : Boolean , default: false}
})

const Users = model<Iuser>('user' , userSchema);

export const emailExist = async(email:string)=>{
    const user = await Users.findOne({email:email});
    return !!user;
}

export const addUser = async( req:Request)=>{
    const hash = await bcrypt.hash(req.body.password , 10);
    const newUser = new Users({username: req.body.username , email: req.body.email , password: hash})
    await newUser.save();

    req.session.userid = newUser._id as string;
    req.session.username = newUser.username;
}

export const login = async (req:Request)=>{
    const user = await Users.findOne({email: req.body.email});
    if(!user){
        req.flash("errors", "email or password is incorrect"); 
        return false;
    }
    const isMatch = await bcrypt.compare(req.body.password , user.password)
    if(isMatch){
        req.session.userid = user._id as string;
        req.session.username = user.username;
        if(user.isadmin)
            req.session.isadmin = true;
        return true
    }
    req.flash("errors", "email or password is incorrect"); 
    return false;
}