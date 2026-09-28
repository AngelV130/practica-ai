import { Router } from 'express';
import { asyncHandler } from '../../common/utils/async-handler.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { getJob, listJobs } from './job.controller.js';
import { jobIdSchema } from './job.schemas.js';

export const jobRouter = Router();

jobRouter.get('/', asyncHandler(listJobs));
jobRouter.get('/:id', validate({ params: jobIdSchema }), asyncHandler(getJob));
