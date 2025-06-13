import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { CustomLogger } from './logger/custom-logger.service';
import { AllExceptionsFilter } from './exception-filter/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const port = process.env.PORT || 4000;

  const docPath = join(__dirname, '..', 'doc', 'api.yaml');
  const docFile = await readFile(docPath, 'utf8');
  const document = yaml.load(docFile) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, err.stack, 'Process');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled Rejection at: ${promise}, reason: ${reason}`,
      '',
      'Process',
    );
  });

  await app.listen(port);
}
bootstrap();
