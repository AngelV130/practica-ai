import { NotFoundError } from '../common/errors/not-found-error.js';

export function notFound(request, _response, next) {
  next(new NotFoundError(`Ruta ${request.method} ${request.originalUrl} no encontrada`));
}
