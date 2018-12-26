import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import NodeRouter from './routes/nodeRouter';
import SignRouter from './routes/signRouter';

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
        mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
            .catch((err :String) => {
                console.log(err);
                process.exit(1);
            });


        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, "public")));

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
        this.app.use('/authentication',SignRouter);

        this.app.all("*", (req,res) => {
            res.send('404');
        })
    }
}


