import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 4000;

  // Load the OpenAPI specification from the YAML file
  const docPath = join(__dirname, '..', 'doc', 'api.yaml');
  const docFile = await readFile(docPath, 'utf8');
  const document = yaml.load(docFile) as OpenAPIObject;

  // Set up Swagger UI using the loaded document
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
