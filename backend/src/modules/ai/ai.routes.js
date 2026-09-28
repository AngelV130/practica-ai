import { Router } from 'express';
import { asyncHandler } from '../../common/utils/async-handler.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { streamJobSummary } from './ai.controller.js';
import { jobSummaryParamsSchema } from './ai.schemas.js';

export const aiRouter = Router();

aiRouter.get(
  '/summary/:id',
  validate({ params: jobSummaryParamsSchema }),
  asyncHandler(streamJobSummary),
);
