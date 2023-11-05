import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Subject } from "../models/domain/subject";
import { SubjectDto } from "../models/dto/subject-dto";

@Injectable()
export class SubjectProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Subject,
        SubjectDto,
        forMember(
          (destination) => destination.subjectId,
          mapFrom((source) => source.id)
        )
      ),
        createMap(
          mapper,
          SubjectDto,
          Subject,
          forMember(
            (destination) => destination.id,
            mapFrom((source) => source.subjectId)
          )
        );
    };
  }
}
