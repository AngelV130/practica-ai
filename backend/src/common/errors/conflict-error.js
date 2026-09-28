import { AppError } from './app-error.js';

export class ConflictError extends AppError {
  constructor(message = 'El recurso ya existe') {
    super(message, { statusCode: 409, code: 'CONFLICT' });
  }
}
