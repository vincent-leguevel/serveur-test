import {Router,Request,Response,NextFunction} from 'express';

class nodeRouter {

    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private index(req: Request, res:Response, next:NextFunction) {
        console.log(req.user);
        res.render('index', { title: 'nosServicesEnMieux', message: 'Node Router'})

    }

    public routes() : void {
        this.router.get('/',this.index);
    }
}
const nodeRoutes = new nodeRouter();
nodeRoutes.routes();

export default nodeRoutes.router;