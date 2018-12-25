import {Router,Request,Response,NextFunction} from 'express';

class signRouter {

    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private signIn(req: Request, res:Response, next:NextFunction) {

        res.render('signIn', { title: 'Hey', message: 'Hello there!'})

    }

    public routes() : void {
        this.router.get('/sign-in',this.signIn);
    }
}
const signRoutes = new signRouter();
signRoutes.routes();

export default signRoutes.router;