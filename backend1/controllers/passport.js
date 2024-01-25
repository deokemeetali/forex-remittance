// In your server code

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('./models/user'); // Replace with your user model

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Replace with your secret key
}, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'User not found' });
    }
  } catch (error) {
    return done(error, false, { message: 'Error authenticating user' });
  }
}));

// Add passport.initialize() middleware
app.use(passport.initialize());
