import { z } from 'zod';

export const jobSummaryParamsSchema = z.object({
  id: z.uuid(),
});
