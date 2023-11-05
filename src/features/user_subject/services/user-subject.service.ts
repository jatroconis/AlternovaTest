import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserSubject } from "../models/domain/user_subject";
import { UserSubjectDto } from "../models/dto/user-subject.dto";
import { UserSubjectMapper } from "../profile/user-subject-mapper";

@Injectable()
export class UserSubjectService {
  constructor(
    @InjectRepository(UserSubject)
    private readonly userRepository: Repository<UserSubject>,
    private readonly userSubjectMapper: UserSubjectMapper
  ) {}

  async save(objectDto: UserSubjectDto): Promise<UserSubjectDto> {
    const userSubject = await this.userRepository.save(
      this.userSubjectMapper.toDomain(objectDto)
    );
    return this.userSubjectMapper.toDto(userSubject);
  }
}
