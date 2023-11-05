import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SubjectModule } from "./subject/subject.module";

@Module({
  imports: [UserModule, SubjectModule],
})
export class FeatureModule {}
