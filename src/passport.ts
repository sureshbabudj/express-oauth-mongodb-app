// app/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config';
import { User } from './models/user';

export const googleStrategy = new GoogleStrategy(
    {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
        // Retrieve user data from the profile object
        const { id, displayName, emails } = profile;
        const email = emails && emails.length ? emails[0].value : '';

        try {
            // Check if the user already exists in the database
            const user = await User.findOne({ googleId: id });
            if (user) {
                return done(null, user);
            }
            // User doesn't exist, create a new user record in the database
            const newUser = new User({
                googleId: id,
                name: displayName,
                email: email,
            });

            // Save the new user in the database
            const createdUser = await newUser.save();
            return done(null, createdUser);
        } catch (error: any) {
            return done(error);
        }
    }
)

