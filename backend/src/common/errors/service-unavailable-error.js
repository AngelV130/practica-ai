import { AppError } from './app-error.js';

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Servicio temporalmente no disponible', code = 'SERVICE_UNAVAILABLE') {
    super(message, { statusCode: 503, code });
  }
}
