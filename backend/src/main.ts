import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from storage directory
  // En mode dev, __dirname = dist/src, donc on remonte de 2 niveaux
  app.useStaticAssets(join(__dirname, "..", "..", "storage"), {
    prefix: "/storage/",
  });

  // Set a global prefix for all routes
  app.setGlobalPrefix("api/v1");

  // Configuration globale pour la validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Lève une erreur si des propriétés non définies sont envoyées
      transform: true, // Transforme automatiquement les types
    }),
  );

  // Enable CORS for all routes
  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  });

  // Swagger setup to document the API
  const config = new DocumentBuilder()
    .setTitle("PokéClean API")
    .setVersion("1.0.0")
    .setDescription(
      "API complète pour gérer vos tâches ménagères et votre collection de cartes Pokémon.\n\n" +
        "## Fonctionnalités\n" +
        "- 🏠 **Gestion des tâches** : Tâches ponctuelles, cycliques et à la volée\n" +
        "- 📊 **Historique** : Suivi complet de toutes les tâches réalisées\n" +
        "- 🎴 **Collection de cartes** : Gérez votre collection de cartes Pokémon\n" +
        "- 🐾 **Pokédex** : Base de données complète des Pokémon\n" +
        "- 👥 **Utilisateurs** : Gestion multi-utilisateurs",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, document);

  // Start the application on the specified port
  await app.listen(process.env.APP_PORT!, process.env.APP_HOST!, () => {
    console.info(
      `🚀 Application is running on: http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1`,
    );
    console.info(
      `📚 Swagger documentation is available at: http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1/docs`,
    );
  });
}
bootstrap();
