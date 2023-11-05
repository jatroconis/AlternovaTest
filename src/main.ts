import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initSwagger } from "./configuration/utilities/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*", methods: "*" });
  app.setGlobalPrefix("imagine/api");
  initSwagger(app);
  await app.listen(4000);
}
bootstrap();
