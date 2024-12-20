import { RequestHandler } from "express";
import {emailExist , addUser} from '../models/auth.model'

export const signup:RequestHandler = async (req,res,next)=>{
    // check if data is valid and send errors with express-flash
    // check if the email is unique
    //add data to database

    
}