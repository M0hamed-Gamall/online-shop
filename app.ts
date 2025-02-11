import dotenv from 'dotenv';
dotenv.config();
import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import morgan from 'morgan'
import homerouter from './routes/home.route'
import productrouter from './routes/product.route'
import authrouter from './routes/auth.route'
import cartrouter from './routes/cart.route'
import flash from 'express-flash';
import session from 'express-session';
import { flashHandler } from './middlewares/flashHandler';
import {save_user_info_in_locals} from './middlewares/userInfo'
import connectMongoDBSession from 'connect-mongodb-session';
import { DB_URL } from './config/db.connect';
import { errorHandling } from './middlewares/errorHandling';
import orderrouter from './routes/order.route'


const app = express();

declare module 'express-session' {
    interface SessionData {
      userid: string; // Add any custom properties you need
      username: string
    }
}

const mongodbStore = connectMongoDBSession(session);

const STORE = new mongodbStore({
    uri: DB_URL,
    collection: "sessions"
})

app.use(session({
    secret: "my secret key",
    saveUninitialized: false,
    resave: false, // Explicitly set to avoid unnecessary session saves
    store: STORE,
    cookie:{
        maxAge:7*24*60*60*1000 
    },
}));


app.use(save_user_info_in_locals);

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
app.use('/cart', cartrouter)
app.use('/product', productrouter);
app.use('/orders', orderrouter);
app.use(errorHandling)


app.listen(process.env.PORT || 3000 , ()=>{
    console.log("app working on port " , process.env.PORT || 3000)
})
