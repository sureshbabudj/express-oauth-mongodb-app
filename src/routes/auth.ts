// app/routes/auth.ts
import express, { Request, Response, Router } from 'express';
import passport from 'passport';

const router: Router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect or handle the response as desired
    res.redirect('/');
  }
);

router.get('/login', (req, res) => res.send('login'))

router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      // Handle any error that occurs during logout
      console.error('Error during logout:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Successful logout
    return res.redirect('/');
  });
  res.redirect('/');
});

export default router;
