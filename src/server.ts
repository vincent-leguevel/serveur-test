import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// import mongoose from 'mongoose';
import NodeRouter from './routes/nodeRouter';

export default class Server {

    private app : express.Application;
    private readonly MONGO_URI = 'mongodb://localhost/server';
    private readonly port : number;

    constructor(port : number) {
        this.app = express();
        this.config();
        this.routes();
        this.port = port;

    }

    private config(): void {

        //setup mongoose
        // mongoose.connect(this.MONGO_URI);

        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());

        this.app.set('views',path.join(__dirname,'../views'));
        this.app.set('view engine','pug');


    }

    public start(): void {

        this.app.listen(this.port,() => {
            console.log(`Server started on port ${this.port}.`)
        });
    }

    private routes(): void {

        //Déclarer les diffentes routes
        this.app.use('/',NodeRouter);
    }
}


