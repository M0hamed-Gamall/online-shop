import dotenv from 'dotenv';
dotenv.config();
import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import morgan from 'morgan'
import homerouter from './routes/home.route'
import productrouter from './routes/product.route'
import authrouter from './routes/auth.route'
import flash from 'express-flash';
import session from 'express-session';
import { flashHandler } from './middlewares/flashHandler';
import mongoose from 'mongoose';
import connectMogodbSessio from 'connect-mongodb-session';


const app = express();

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/online-shop";
async function connectDatabase(){
    try{
        await mongoose.connect(DB_URL);
    } catch(err){
        throw err;
    }
}
connectDatabase();



declare module 'express-session' {
    interface SessionData {
      userid: string; // Add any custom properties you need
    }
}

const mongodbStore = connectMogodbSessio(session);
const STORE = new mongodbStore({
    uri: DB_URL,
    collection: "sessions"
})

app.use(session({
    secret: "my secret key",
    saveUninitialized: false,
    // cookie:{
    //     maxAge:7*24*60*60*1000 // default once the browser colsed cookie deleted
    // }
    store: STORE
}));



app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "assets")));
app.use(express.static(path.join(__dirname , "images")));

app.use(flash())
app.use(flashHandler);

app.use('/', homerouter);
app.use('/', authrouter);
app.use('/product',productrouter);

app.use((req,res,next)=>{
    res.status(404).send("404 Not Found")
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Error handling logic
    // 500
    // Implement CustomError Class
    // let err = {
    //     msgs: ["Email already exists", "username"],
    //     statusCode
    // }

    // req.flash("error", err.msgs)
    console.log("err happend : " , err)
}

app.use(errorHandler);

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("app working on port " , process.env.PORT || 3000)
})
