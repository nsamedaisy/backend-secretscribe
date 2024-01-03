// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.enableCors(); // Enable CORS for all routes
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

const PORT = 3003;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  var cors = require('cors')
  app.use(cors())

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT).then(() => console.log(`\nserver running on port ${PORT}`));
}
bootstrap();
