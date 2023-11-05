import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SubjectModule } from "./subject/subject.module";
import { UserSubjectModule } from "./user_subject/user_subject.module";
import { UserService } from "./user/services/user.service";

@Module({
  imports: [UserModule, SubjectModule, UserSubjectModule],
})
export class FeatureModule {}
