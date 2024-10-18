const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  

passport.use(new GoogleStrategy({
    clientID: '23445605965-bjgggqt16tql8dbc8vtq61gdn63qnmqs.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    (accessToken, refreshToken, profile, done)=>{
        return done(null, profile);
    }
));