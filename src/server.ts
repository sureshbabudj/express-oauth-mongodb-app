// app/server.ts
import path from 'path';
import express, { Application } from 'express';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';
import { default as connectMongoDBSession } from 'connect-mongodb-session';

import authRoutes from './routes/auth';
import indexRoutes from './routes/index';
import passport from 'passport';
import config from './config';
import { googleStrategy } from './passport'
import { User } from './models/user';
import process from 'node:process';

const app: Application = express();
const port: number = Number(process.env.PORT) || 8080;
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

const MongoDBStore = connectMongoDBSession(session);
const sessionStore = new MongoDBStore({
  uri: config.databaseURI,
  collection: 'sessions',
});

sessionStore.on('error', (error: Error) => {
  console.error('Session store error:', error);
});

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
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
