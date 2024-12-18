import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import morgan from 'morgan'


const app = express();

app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine" , "views");
app.use(express.static(path.join(__dirname , "assets")));

app.get('/' , (req,res,next)=>{
    res.send("begin");
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("app working on port " , process.env.PORT || 3000)
})