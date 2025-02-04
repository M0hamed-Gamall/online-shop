import {Schema , model , Document} from "mongoose";
import bcrypt from 'bcrypt'
import { Request } from "express";


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
        const user = await users.findOne({email:email});
        return !!user;
    } catch(err){
        throw err;
    }
}

export const addUser = async( req:Request)=>{
    try{
        const hash = await bcrypt.hash(req.body.password , 10);
        const newUser = new users({username: req.body.username , email: req.body.email , password: hash})
        await newUser.save();

        let id = (await users.findOne({email : req.body.email}))?._id
        req.session.userid = id as string;
        req.session.username = req.body.username;

    }catch(err){
        throw err;
    } 
}

export const login = async (req:Request)=>{
    try{
        const user = await users.findOne({email: req.body.email});
        if(!user){
            req.flash("errors", "email or password is incorrect"); 
            return false;
        }
        const isMatch = await bcrypt.compare(req.body.password , user.password)
        if(isMatch){
            req.session.userid = user._id as string;
            req.session.username = user.username;
            return true
        }
        req.flash("errors", "email or password is incorrect"); 
        return false;
    }catch(err){
        throw err;
    }
}