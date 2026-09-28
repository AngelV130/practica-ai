import pino from 'pino';
import { env } from './env.js';

const loggerOptions = {
  level: env.LOG_LEVEL,
  base: {
    service: 'modular-express-api',
    environment: env.NODE_ENV,
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'headers.authorization',
      'headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
    ],
    censor: '[REDACTED]',
  },
};

function createLogTransport() {
  const targets = [];

  if (env.NODE_ENV === 'development') {
    targets.push({
      target: 'pino-pretty',
      level: env.LOG_LEVEL,
      options: {
        colorize: true,
        colorizeObjects: true,
        levelFirst: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
        ignore: 'pid,hostname',
        errorLikeObjectKeys: ['err', 'error'],
        errorProps: '*',
        customColors: 'trace:gray,debug:blue,info:cyan,warn:yellow,error:red,fatal:bgRed',
      },
    });
  } else {
    targets.push({
      target: 'pino/file',
      level: env.LOG_LEVEL,
      options: { destination: 1 },
    });
  }

  if (env.ERROR_LOG_ENABLED) {
    targets.push({
      target: 'pino/file',
      level: 'error',
      options: {
        destination: env.ERROR_LOG_PATH,
        mkdir: true,
      },
    });
  }

  return pino.transport({ targets });
}

export const logger = pino(loggerOptions, createLogTransport());
