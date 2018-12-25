import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import NodeRouter from './routes/nodeRouter';
import dotenv from 'dotenv'

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
        mongoose.connect(process.env.MONGO_URI)
            .catch((err :String) => {
                console.log(err);
                process.exit(2);
            });

        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());

        this.app.set('views',path.join(__dirname,'../views'));
        this.app.set('view engine','pug');
    }

    public start(): void {

        this.app.listen(process.env.PORT,() => {
            console.log(`Server started on port ${process.env.PORT}.`)
        });
    }

    private routes(): void {
        //Déclarer les diffentes routes
        this.app.use('/',NodeRouter);
    }
}


