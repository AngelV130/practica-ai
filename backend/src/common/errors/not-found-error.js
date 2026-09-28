import { AppError } from './app-error.js';

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, { statusCode: 404, code: 'NOT_FOUND' });
  }
}
