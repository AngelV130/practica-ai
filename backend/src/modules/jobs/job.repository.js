import { readFile } from 'node:fs/promises';

const jobsFileUrl = new URL('../../utils/moocs/jobs.json', import.meta.url);

async function readJobsFile() {
  const contents = await readFile(jobsFileUrl, 'utf8');
  const jobs = JSON.parse(contents);

  if (!Array.isArray(jobs)) {
    throw new TypeError('jobs.json debe contener un arreglo');
  }

  return jobs;
}

export class JobRepository {
  async findAll() {
    return readJobsFile();
  }

  async findById(id) {
    const jobs = await readJobsFile();
    return jobs.find((job) => job.id === id) ?? null;
  }
}

export const jobRepository = new JobRepository();
