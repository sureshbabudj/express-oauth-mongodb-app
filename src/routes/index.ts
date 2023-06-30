// app/routes/index.ts
import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', { userProfile: req.user ?? null });
});

export default router;
