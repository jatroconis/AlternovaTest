import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Mapper as IMapper } from "src/core/utilities/mapper";
import { User } from "../models/domain/user";
import { UserDto } from "../models/dto/user-dto";

@Injectable()
export class UserMapper implements IMapper<User, UserDto> {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  asyncToDomain(mapper: UserDto): Promise<User> {
    return this.mapper.mapAsync(mapper, UserDto, User);
  }
  asyncToDto(mapper: User): Promise<UserDto> {
    return this.mapper.mapAsync(mapper, User, UserDto);
  }
  asyncArrayDomain(mappers: UserDto[]): Promise<User[]> {
    return this.mapper.mapArrayAsync(mappers, UserDto, User);
  }
  asyncArrayDto(mappers: User[]): Promise<UserDto[]> {
    return this.mapper.mapArrayAsync(mappers, User, UserDto);
  }

  toDomain(mapper: UserDto): User {
    return this.mapper.map(mapper, UserDto, User);
  }
  toDto(mapper: User): UserDto {
    return this.mapper.map(mapper, User, UserDto);
  }

  toUserWithSubjectsDto(mapper: User): UserDto {
    return this.mapper.map(mapper, User, UserDto);
  }
}
