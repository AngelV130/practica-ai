import { AppError } from '../common/errors/app-error.js';

export const validate = (schemas) => async (request, _response, next) => {
  try {
    for (const [location, schema] of Object.entries(schemas)) {
      request[location] = await schema.parseAsync(request[location]);
    }
    next();
  } catch (error) {
    next(
      new AppError('Datos de solicitud invalidos', {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        details: error.issues,
      }),
    );
  }
};
