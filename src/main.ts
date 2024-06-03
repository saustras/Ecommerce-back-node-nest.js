
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './core/interfaces/response.interceptor';
import { json, urlencoded } from 'body-parser';


const docsEndpoint = '/api';
const title = 'Ecommerce back';

function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('Ecommerce de venta de juegos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document);
}

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });

  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  configureSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions:{
      enableImplicitConversion: true
    }
  }))

  app.use(
   json({ limit: '50mb' }),
   urlencoded({ limit: '50mb', extended: true }),
  );

  await app.startAllMicroservices();
  await app.listen(`${process.env.PORT}`);
  logger.log(
    `🚀 Procedure commerletter service running on port ${process.env.PORT}}`,
  );
}
bootstrap();

