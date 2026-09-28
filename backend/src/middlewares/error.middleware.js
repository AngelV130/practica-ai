import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode ?? 500;
  const isServerError = statusCode >= 500;

  logger[isServerError ? 'error' : 'warn'](
    {
      err: error,
      requestId: request.id,
      method: request.method,
      url: request.originalUrl,
    },
    error.message,
  );

  if (response.headersSent) {
    return next(error);
  }

  return response.status(statusCode).json({
    success: false,
    error: {
      code: error.code ?? 'INTERNAL_ERROR',
      message:
        isServerError && env.NODE_ENV === 'production'
          ? 'Error interno del servidor'
          : error.message,
      ...(error.details && { details: error.details }),
      ...(env.NODE_ENV !== 'production' && error.stack && { stack: error.stack }),
    },
    requestId: request.id,
  });
}
