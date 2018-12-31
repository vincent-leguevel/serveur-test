import {Strategy} from 'passport-local';
import passport from "passport";
import bcrypt from "bcrypt";
import UserModel from '../../models/userModel';


let localStrategy = new Strategy({

        usernameField:'mail',
        passwordField:'password',
        passReqToCallback: true
    },
    async (req,mail, password, done) => {

        console.log(mail+password)
        let user = await UserModel.findOne({mail:mail});

        if(!user) {
            console.log("if!user "+mail+password);
            return done(null, false, req.flash('erreur','une erreur est survenue'));
        }


        let isMatch = await bcrypt.compare(password,user.password);

        if(isMatch) {
            console.log("isMatch "+mail+password);
            return done(null,user, {message: "Vous êtes connecté"});
        }
        else {
            console.log("notMatch "+mail+password);
            return done(null, false, {message: "Mauvais mot de passe"})
        }


    }
);
export default localStrategy;


passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    UserModel.findById(id,(err,user) => {
        done(err,user);
    });
});