import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubjectController } from "./interfaces/subject-controller";
import { Subject } from "./models/domain/subject";
import { SubjectMapper } from "./profile/subject-mapper";
import { SubjectProfile } from "./profile/subject-profile";
import { SubjectService } from "./services/subject.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), UserModule],
  providers: [SubjectProfile, SubjectMapper, SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
