import { streamText } from 'ai';
import { getOpenRouterModel } from '../../config/ai.js';
import { logger } from '../../config/logger.js';
import { jobService } from '../jobs/job.service.js';
import { buildJobSummaryPrompt } from './ai.prompt.js';

export class AiService {
  constructor({ jobs = jobService, getModel = getOpenRouterModel, stream = streamText } = {}) {
    this.jobs = jobs;
    this.getModel = getModel;
    this.stream = stream;
  }

  async createJobSummaryStream(id, { abortSignal } = {}) {
    const job = await this.jobs.getById(id);
    const { system, prompt } = buildJobSummaryPrompt(job);

    return this.stream({
      model: this.getModel(),
      system,
      prompt,
      abortSignal,
      // timeout: env.AI_TIMEOUT_MS,
      // maxOutputTokens: env.AI_MAX_OUTPUT_TOKENS,
      // maxRetries: 2,
      onError: ({ error }) => {
        logger.error(
          {
            err: error,
            event: 'external_service_error',
            externalService: 'openrouter',
            jobId: id,
          },
          'OpenRouter fallo durante el stream del resumen',
        );
      },
    });
  }
}

export const aiService = new AiService();
