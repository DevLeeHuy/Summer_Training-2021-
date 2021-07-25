const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/User.model");

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://localhost:5000/user/auth/facebook/cb",
    },
    function (accessToken, refreshToken, profile, done) {
      FindOrCreateUser(profile, done);
    }
  )
);

passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      FindOrCreateUser(profile, done);

      //   console.log("accessToken: ", accessToken);
      //   console.log("refreshToken: ", refreshToken);
      //   console.log("profile: ", profile);
    }
  )
);

async function FindOrCreateUser(profile, done) {
  try {
    //Check existence of user
    const user = await User.findOne({
      "auth.type": profile.provider,
      "auth.id": profile.id,
    });
    //Existed
    if (user) done(null, user);
    //Create new user
    else {
      const newUser = new User({
        auth: { type: profile.provider, id: profile.id },
        email: profile.emails[0].value,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        picture: profile.photos[0].value,
      });
      await newUser.save();
      done(null, newUser);
    }
  } catch (err) {
    console.log("error: " + err);
    done(err, false);
  }
}
