import express, {NextFunction} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import session from 'express-session';
import passport from "passport";
import flash from 'connect-flash';

import localStrategy from "./config/passport/passport-local-setup";

import NodeRouter from './routes/nodeRouter';
import ClientRouter from './routes/clientRouter';
import SignRouter from './routes/signRouter'

export default class Server {

    private app : express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {

        dotenv.config();
        //setup mongoose
        //@ts-ignore
        mongoose.connect(process.env.MONGO_URI_ONLINE,{
            useNewUrlParser:true,
            useCreateIndex: true
        })
            .then(() => {
                //TODO suelement pour le débug. lancer le projet une première fois puis commenter la ligne. relancer le projet une seconde fois
                // mongoose.connection.db.dropDatabase()
                console.log("mongoose correctement connecté")
            })
            .catch((err :String) => {
                console.log(err);
                process.exit(1);
            });

        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.use(flash());

        this.app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use(localStrategy);

        this.app.set('views',path.join(__dirname,'../views'));
        this.app.set('view engine','pug');
        this.app.set('env',process.env.NODE_ENV);
    }

    public start(): void {

        this.app.listen(process.env.PORT,() => {
            console.log(`Serveur démarré sur le port ${process.env.PORT}.`)
        });
    }

    private routes(): void {
        //Déclarer les diffentes routes
        this.app.use('/',NodeRouter);
        this.app.use('/client',ClientRouter);
        this.app.use('/auth',SignRouter);

        this.app.all("*", (req,res) => {
            res.send('404');
        })
    }
}