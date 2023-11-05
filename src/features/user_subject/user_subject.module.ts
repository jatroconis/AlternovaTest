import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubject } from "./models/domain/user_subject";
import { UserSubjectMapper } from "./profile/user-subject-mapper";
import { UserSubjectProfile } from "./profile/user-subject-profile";
import { UserSubjectController } from "./interfaces/user-subject-controller";
import { UserSubjectService } from "./services/user-subject.service";
import { UserModule } from "../user/user.module";
import { SubjectModule } from "../subject/subject.module";
import { UserService } from "../user/services/user.service";
import { SubjectService } from "../subject/services/subject.service";
import { UserMapper } from "../user/profile/user-mapper";
import { SubjectMapper } from "../subject/profile/subject-mapper";
import { User } from "../user/models/domain/user";
import { Subject } from "typeorm/persistence/Subject";

@Module({
  imports: [TypeOrmModule.forFeature([UserSubject]), UserModule, SubjectModule],
  providers: [UserSubjectMapper, UserSubjectProfile, UserSubjectService],
  controllers: [UserSubjectController],
  exports: [],
})
export class UserSubjectModule {}
