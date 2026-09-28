import { createServer as createHttpServer } from 'node:http';
import { createServer as createHttpsServer } from 'node:https';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { loadTlsOptions } from './config/tls.js';

async function bootstrap() {
  const app = createApp();
  const tlsOptions = await loadTlsOptions();
  const server = tlsOptions ? createHttpsServer(tlsOptions, app) : createHttpServer(app);
  let shuttingDown = false;

  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, 'Apagado ordenado iniciado');

    const forceShutdown = setTimeout(() => {
      logger.error({ event: 'forced_shutdown' }, 'Tiempo de apagado agotado; finalizando proceso');
      process.exit(1);
    }, env.SHUTDOWN_TIMEOUT_MS);
    forceShutdown.unref();

    server.close((error) => {
      clearTimeout(forceShutdown);
      if (error) {
        logger.error({ err: error, event: 'server_shutdown_error' }, 'Error al cerrar el servidor');
        process.exit(1);
      }
      logger.info('Servidor cerrado correctamente');
      process.exit(0);
    });
  };

  server.listen(env.PORT, env.HOST, () => {
    logger.info({
      host: env.HOST,
      port: env.PORT,
      protocol: tlsOptions ? 'https' : 'http',
      apiPrefix: env.API_PREFIX,
    });
    console.log(
      `Server ON: ${tlsOptions ? 'https' : 'http'}://${env.HOST}:${env.PORT}${env.API_PREFIX}`,
    );
  });

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  logger.fatal(
    { err: error, event: 'server_startup_failure' },
    'No fue posible iniciar el servidor',
  );
  process.exit(1);
});
