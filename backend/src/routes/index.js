import { Router } from 'express';
import { healthRouter } from '../modules/health/health.routes.js';
import { jobRouter } from '../modules/jobs/job.routes.js';
import { aiRouter } from '../modules/ai/ai.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/ai', aiRouter);
