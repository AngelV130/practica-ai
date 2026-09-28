import { createOpenAI } from '@ai-sdk/openai';
import { ServiceUnavailableError } from '../common/errors/service-unavailable-error.js';
import { env } from './env.js';

let openRouterProvider;

export function getOpenRouterModel() {
  if (!env.OPENROUTER_API_KEY) {
    throw new ServiceUnavailableError(
      'El servicio de resumen no esta configurado. Define OPENROUTER_API_KEY.',
      'AI_NOT_CONFIGURED',
    );
  }

  openRouterProvider ??= createOpenAI({
    name: 'openrouter',
    apiKey: env.OPENROUTER_API_KEY,
    baseURL: env.OPENROUTER_BASE_URL,
  });

  return openRouterProvider(env.OPENROUTER_MODEL);
}
