import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { encrypt } from "src/core/utilities/crypto";
import { User } from "../models/domain/user";
import { UserDto } from "../models/dto/user-dto";

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.id)
        )
      );
      createMap(
        mapper,
        UserDto,
        User,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.userId)
        ),
        forMember(
          (destination) => destination.password,
          mapFrom((source) => encrypt(source.password))
        )
      );
    };
  }
}
