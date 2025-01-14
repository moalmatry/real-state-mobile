import log from '../utils/logger';
import express, { Request, Response } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = express.Router();

router.get('/healthCheck', (_: Request, res: Response) => {
  log.info('The Api is Working');
  res.sendStatus(200);
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get('/', (req: Request, res: Response) => {
  return res.send('Welcome to E-commerce Api');
});

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/auth', authRoutes);

export default router;
