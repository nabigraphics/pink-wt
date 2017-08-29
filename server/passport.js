// database
const querynyaa = require('./query');

const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport,id,pw) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: id,
        passwordField: pw,
        session: true,
        passReqToCallback: false,
    }, async (id, password, done) => {
        let userdata = await querynyaa.findUser(id,password);
        if(userdata.status == "login"){
            return done(null,userdata.data);
        }else{
            return done(null,false);
        }
    }));
}