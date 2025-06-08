import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const docPath = join(__dirname, '..', 'doc', 'api.yaml');
  const docFile = await readFile(docPath, 'utf8');
  const document = yaml.load(docFile) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
