import { readFile } from 'node:fs/promises';
import { env } from './env.js';

export async function loadTlsOptions() {
  if (!env.TLS_ENABLED) return null;

  const [key, cert, ca] = await Promise.all([
    readFile(env.TLS_KEY_PATH),
    readFile(env.TLS_CERT_PATH),
    env.TLS_CA_PATH ? readFile(env.TLS_CA_PATH) : Promise.resolve(undefined),
  ]);

  return {
    key,
    cert,
    ...(ca && { ca }),
    ...(env.TLS_PASSPHRASE && { passphrase: env.TLS_PASSPHRASE }),
    minVersion: 'TLSv1.2',
  };
}
