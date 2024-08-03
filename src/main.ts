import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("CSM API")
    .setDescription("The CMS API description")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.setGlobalPrefix("api");
  app.use(session({
    secret: "secretfdfdfdfdfdfdfdfgrthtrhgdsf",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(5000);
}

bootstrap().then(() => {
  console.log("App is running on port 5000");
});
