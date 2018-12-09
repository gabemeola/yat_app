import path from 'path';
import express from 'express';
import cacheControl from '../middleware/cacheControl';
import { baseDir } from '../constants';

const router = express.Router();

// Expose Public Dir
router.use(
  '/',
  cacheControl,
  express.static(path.join(baseDir, '..', 'public'))
);

export default router;
