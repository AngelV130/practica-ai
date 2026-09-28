import { NotFoundError } from '../../common/errors/not-found-error.js';
import { jobRepository } from './job.repository.js';

export class JobService {
  constructor(repository) {
    this.repository = repository;
  }

  list() {
    return this.repository.findAll();
  }

  async getById(id) {
    const job = await this.repository.findById(id);

    if (!job) {
      throw new NotFoundError('Vacante no encontrada');
    }

    return job;
  }
}

export const jobService = new JobService(jobRepository);
