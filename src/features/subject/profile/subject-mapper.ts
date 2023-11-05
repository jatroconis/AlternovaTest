import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Mapper as IMapper } from "src/core/utilities/mapper";
import { Subject } from "../models/domain/subject";
import { SubjectDto } from "../models/dto/subject-dto";

@Injectable()
export class SubjectMapper implements IMapper<Subject, SubjectDto> {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  asyncToDomain(mapper: SubjectDto): Promise<Subject> {
    return this.mapper.mapAsync(mapper, SubjectDto, Subject);
  }
  asyncToDto(mapper: Subject): Promise<SubjectDto> {
    return this.mapper.mapAsync(mapper, Subject, SubjectDto);
  }
  asyncArrayDomain(mappers: SubjectDto[]): Promise<Subject[]> {
    return this.mapper.mapArrayAsync(mappers, SubjectDto, Subject);
  }
  asyncArrayDto(mappers: Subject[]): Promise<SubjectDto[]> {
    return this.mapper.mapArrayAsync(mappers, Subject, SubjectDto);
  }

  toDomain(mapper: SubjectDto): Subject {
    return this.mapper.map(mapper, SubjectDto, Subject);
  }
  toDto(mapper: Subject): SubjectDto {
    return this.mapper.map(mapper, Subject, SubjectDto);
  }
}
