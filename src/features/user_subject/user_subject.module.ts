import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubject } from "./models/domain/user_subject";

@Module({
  imports: [TypeOrmModule.forFeature([UserSubject])],
  providers: [],
  controllers: [],
  exports: [],
})
export class UserSubjectModule {}
