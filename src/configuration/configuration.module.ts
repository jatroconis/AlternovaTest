import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./utilities/configuration";

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService],
  exports: [ConfigModule, ConfigService],
})
export class ConfigurationModule {}
