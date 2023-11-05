import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AutomapperModule } from "@automapper/nestjs";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { classes } from "@automapper/classes";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./core/utilities/http-expection";
import { FeatureModule } from "./features/features.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    FeatureModule,
    AuthModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {
  static PORT: number;
  constructor(private readonly _config: ConfigService) {
    AppModule.PORT = this._config.get<number>("PORT");
  }
}
