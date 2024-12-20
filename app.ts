import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import morgan from 'morgan'
import homerouter from './routes/home.route'
import productrouter from './routes/product.route'
import authrouter from './routes/auth.route'
import flash from 'express-flash';
import session from 'express-session';

const app = express();

app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true
}));
app.use(flash())

app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "assets")));
app.use(express.static(path.join(__dirname , "images")));


app.use('/', homerouter);
app.use('/product',productrouter);
app.use('/', authrouter);

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("app working on port " , process.env.PORT || 3000)
})
