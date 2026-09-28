import { sendSuccess } from '../../common/utils/api-response.js';
import { healthService } from './health.service.js';

export function getHealth(_request, response) {
  return sendSuccess(response, healthService.getStatus());
}
