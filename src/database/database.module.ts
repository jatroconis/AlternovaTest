import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "src/configuration/utilities/configuration";
import { Database } from "./models/database";

const database: Database = configuration().database;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: database.host,
      port: database.port,
      username: database.user,
      password: database.password,
      database: database.name,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
