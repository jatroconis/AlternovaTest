import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./interfaces/user-controller";
import { User } from "./models/domain/user";
import { UserMapper } from "./profile/user-mapper";
import { UserProfile } from "./profile/user-profile";
import { UserService } from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserProfile, UserMapper, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
