import {Router,Request,Response,NextFunction} from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import passport from "passport";

class signRouter {

    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async register(req: Request, res:Response, next:NextFunction) {


        try{
            let newUser = new UserModel(req.body);

            const genSalt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(req.body.password,genSalt);

            let persistedNewUser = await newUser.save();

            res.json(persistedNewUser);
        }catch (err) {
            res.json(err);
        }
    }

    private login(req: Request, res: Response) {
        res.json(req.flash('erreur'));
        console.log(req.isAuthenticated());
    }

    private logout(req: Request, res : Response) {
        req.logOut();
        res.redirect('/auth/login');
    }

    private dashboard(req: Request, res: Response) {
        console.log(req.flash());
        console.log(req.user);
        res.send('logged')
    }

    private protected(req: Request, res: Response, next: NextFunction) {
        if(req.isAuthenticated()) return next();
        else {
            req.flash('erreur','vous netes pas connecté');
            return res.redirect('/auth/login');
        }
    }

    public routes() : void {

        this.router.get('/login', this.login);
        this.router.get('/dashboard',this.protected, this.dashboard);
        this.router.get('/logout',this.logout);
        this.router.post('/register',this.register);
        this.router.post('/login',
            passport.authenticate('local',{ successRedirect: '/auth/dashboard',
                                                            failureRedirect: '/auth/login',
                                                            failureFlash: true})
        );
    }
}
const signRoutes = new signRouter();
signRoutes.routes();

export default signRoutes.router;