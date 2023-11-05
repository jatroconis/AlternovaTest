import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Mapper as IMapper } from "src/core/utilities/mapper";
import { UserSubject } from "../domain/user_subject";
import { UserSubjectDto } from "../dto/user-subject.dto";

@Injectable()
export class UserSubjectMapper implements IMapper<UserSubject, UserSubjectDto> {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  asyncToDomain(mapper: UserSubjectDto): Promise<UserSubject> {
    return this.mapper.mapAsync(mapper, UserSubjectDto, UserSubject);
  }
  asyncToDto(mapper: UserSubject): Promise<UserSubjectDto> {
    return this.mapper.mapAsync(mapper, UserSubject, UserSubjectDto);
  }
  asyncArrayDomain(mappers: UserSubjectDto[]): Promise<UserSubject[]> {
    return this.mapper.mapArrayAsync(mappers, UserSubjectDto, UserSubject);
  }
  asyncArrayDto(mappers: UserSubject[]): Promise<UserSubjectDto[]> {
    return this.mapper.mapArrayAsync(mappers, UserSubject, UserSubjectDto);
  }

  toDomain(mapper: UserSubjectDto): UserSubject {
    return this.mapper.map(mapper, UserSubjectDto, UserSubject);
  }
  toDto(mapper: UserSubject): UserSubjectDto {
    return this.mapper.map(mapper, UserSubject, UserSubjectDto);
  }
}
