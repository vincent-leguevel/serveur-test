import {Router,Request,Response,NextFunction} from 'express';

class nodeRouter {

    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private index(req: Request, res:Response, next:NextFunction) {

        res.render('index', { title: 'Hey', message: 'Hello there!'})

    }

    public routes() : void {
        this.router.get('/',this.index);
    }
}
const nodeRoutes = new nodeRouter();
nodeRoutes.routes();

export default nodeRoutes.router;