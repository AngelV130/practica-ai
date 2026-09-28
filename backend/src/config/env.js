import 'dotenv/config';
import { z } from 'zod';

const booleanFromString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

const booleanFromStringDefaultTrue = z
  .enum(['true', 'false'])
  .default('true')
  .transform((value) => value === 'true');

const optionalString = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().optional(),
);

const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    HOST: z.string().default('0.0.0.0'),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    API_PREFIX: z.string().startsWith('/').default('/api/v1'),
    TRUST_PROXY: z
      .union([z.literal('true'), z.literal('false'), z.coerce.number().int()])
      .default('false'),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
      .default('info'),
    ERROR_LOG_ENABLED: booleanFromStringDefaultTrue,
    ERROR_LOG_PATH: z.string().min(1).default('logs/error.log'),
    CORS_ORIGINS: z.string().default(''),
    JSON_BODY_LIMIT: z.string().default('100kb'),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
    SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
    OPENROUTER_API_KEY: optionalString,
    OPENROUTER_BASE_URL: z.url().default('https://openrouter.ai/api/v1'),
    OPENROUTER_MODEL: z.string().min(1).default('google/gemma-4-26b-a4b-it:free'),
    AI_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
    AI_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(500),
    TLS_ENABLED: booleanFromString,
    TLS_KEY_PATH: optionalString,
    TLS_CERT_PATH: optionalString,
    TLS_CA_PATH: optionalString,
    TLS_PASSPHRASE: optionalString,
  })
  .superRefine((values, context) => {
    if (values.NODE_ENV === 'production' && values.CORS_ORIGINS.trim() === '') {
      context.addIssue({
        code: 'custom',
        path: ['CORS_ORIGINS'],
        message: 'CORS_ORIGINS es obligatorio en produccion',
      });
    }

    if (values.TLS_ENABLED && (!values.TLS_KEY_PATH || !values.TLS_CERT_PATH)) {
      context.addIssue({
        code: 'custom',
        path: ['TLS_ENABLED'],
        message: 'TLS_KEY_PATH y TLS_CERT_PATH son obligatorios cuando TLS_ENABLED=true',
      });
    }
  });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const messages = parsed.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
  throw new Error(`Configuracion de entorno invalida: ${messages}`);
}

const trustProxy =
  parsed.data.TRUST_PROXY === 'true'
    ? true
    : parsed.data.TRUST_PROXY === 'false'
      ? false
      : parsed.data.TRUST_PROXY;

export const env = Object.freeze({
  ...parsed.data,
  TRUST_PROXY: trustProxy,
  CORS_ORIGINS: parsed.data.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
});
