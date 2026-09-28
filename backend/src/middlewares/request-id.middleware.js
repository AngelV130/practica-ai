import { randomUUID } from 'node:crypto';

export function requestId(request, response, next) {
  request.id = request.get('x-request-id') || randomUUID();
  response.set('x-request-id', request.id);
  next();
}
