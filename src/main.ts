import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const docDir = path.join(__dirname, '..', 'doc');
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir);
  }
  fs.writeFileSync(
    path.join(docDir, 'api-generated.json'),
    JSON.stringify(document, null, 2),
  );

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
