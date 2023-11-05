import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserSubject } from "../models/domain/user_subject";
import { UserSubjectDto } from "../models/dto/user-subject.dto";

@Injectable()
export class UserSubjectProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        UserSubject,
        UserSubjectDto,
        forMember(
          (destination) => destination.userSubjectId,
          mapFrom((source) => source.id)
        ),
        forMember(
          (destination) => destination.user,
          mapFrom((source) => source.user)
        ),
        forMember(
          (destination) => destination.subject,
          mapFrom((source) => source.subject)
        )
      ),
        createMap(
          mapper,
          UserSubjectDto,
          UserSubject,
          forMember(
            (destination) => destination.id,
            mapFrom((source) => source.userSubjectId)
          ),
          forMember(
            (destination) => destination.user,
            mapFrom((source) => source.user)
          ),
          forMember(
            (destination) => destination.subject,
            mapFrom((source) => source.subject)
          )
        );
    };
  }
}
