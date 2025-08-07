import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { winstonConfig } from './logging/winston.logging';
import { WinstonModule } from "nest-winston";
import { AllExceptionsFilter } from './common/errors/error.handling';

async function strap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig)
  });
  app.useGlobalFilters(new AllExceptionsFilter())
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const PORT = config.get<number>('PORT');
  const configa = new DocumentBuilder()
    .setTitle('Supermarket API')
    .setDescription('API for Admins and Customers')
    .setVersion('1.0')
    .addTag('admin')
    .addTag('customer')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configa);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
  });
}
strap();
