import { sendSuccess } from '../../common/utils/api-response.js';
import { jobService } from './job.service.js';

export async function listJobs(_request, response) {
  return sendSuccess(response, await jobService.list());
}

export async function getJob(request, response) {
  return sendSuccess(response, await jobService.getById(request.params.id));
}
