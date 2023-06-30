// app/server.ts
import path from 'path';
import express, { Application } from 'express';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';

import authRoutes from './routes/auth';
import indexRoutes from './routes/index';
import passport from 'passport';
import config from './config';
import { googleStrategy } from './passport'
import { User } from './models/user';

const app: Application = express();
const port: number = 8088;

passport.use(googleStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Connect to MongoDB
mongoose.connect(config.databaseURI, {
  useUnifiedTopology: true,
} as ConnectOptions);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
