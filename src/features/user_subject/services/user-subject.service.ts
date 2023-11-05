import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NOT_FOUND, REPEAT } from "src/core/utilities/error-message";
import { StatusSubject } from "src/core/utilities/status";
import { SubjectMapper } from "src/features/subject/profile/subject-mapper";
import { SubjectService } from "src/features/subject/services/subject.service";
import { UserDtoWithSubject } from "src/features/user/models/dto/user-dto";
import { UserMapper } from "src/features/user/profile/user-mapper";
import { UserService } from "src/features/user/services/user.service";
import { Repository } from "typeorm";
import { UserSubject } from "../models/domain/user_subject";
import { UserSubjectDto } from "../models/dto/user-subject.dto";
import { UserSubjectMapper } from "../profile/user-subject-mapper";

@Injectable()
export class UserSubjectService {
  constructor(
    @InjectRepository(UserSubject)
    private readonly userSubjectRepository: Repository<UserSubject>,
    private readonly userSubjectMapper: UserSubjectMapper,
    private readonly userMapper: UserMapper,
    private readonly subjectMapper: SubjectMapper,
    private readonly _user: UserService,
    private readonly _subject: SubjectService
  ) {}

  async save(objectDto: UserSubjectDto): Promise<UserSubjectDto> {
    const existUser = await this._user.findById(objectDto.user.id);
    if (!existUser) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const existsSubject = await this._subject.findById(objectDto.subject.id);
    if (!existsSubject)
      throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const existUserSubject = await this.userSubjectRepository.findOne({
      where: {
        user: { id: existUser.userId },
        subject: { id: existsSubject.subjectId },
      },
    });
    console.log(existUserSubject);
    if (!(existUserSubject === null))
      throw new HttpException(REPEAT.reason, REPEAT.status);
    const userSubject = new UserSubject();

    userSubject.user = this.userMapper.toDomain(existUser);
    userSubject.subject = this.subjectMapper.toDomain(existsSubject);
    const userSaved = await this.userSubjectRepository.save(userSubject);
    return this.userSubjectMapper.toDto(userSaved);
  }

  async findSubjectsByUserId(userId: number): Promise<UserDtoWithSubject> {
    const existUser = await this._user.findUserWithSubjectsByUserId(userId);
    if (!existUser) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const result: UserDtoWithSubject = new UserDtoWithSubject();
    result.userId = existUser.id;
    result.fullname = existUser.fullname;
    result.email = existUser.email;
    result.userSubjects = existUser.userSubjects.map((userSubject) => {
      return {
        subjectId: userSubject.subject.id,
        subjectName: userSubject.subject.title,
        note: userSubject.value,
      };
    });
    return result;
  }

  async finish(objectDto: UserSubjectDto): Promise<UserSubjectDto> {
    const existUser = await this._user.findById(objectDto.user.id);
    if (!existUser) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const existsSubject = await this._subject.findById(objectDto.subject.id);
    if (!existsSubject)
      throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);

    const existUserSubject = await this.userSubjectRepository.findOne({
      where: {
        user: { id: existUser.userId },
        subject: { id: existsSubject.subjectId },
      },
    });
    if (!existUserSubject)
      throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);

    existUserSubject.value = objectDto.value;
    existUserSubject.status = StatusSubject.FINISHED;
    return await this.userSubjectRepository.save(existUserSubject);
  }

  async findResumeById(userId): Promise<UserDtoWithSubject> {
    const existUser = await this._user.findUserWithSubjectsByUserId(userId);
    if (!existUser) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const result: UserDtoWithSubject = new UserDtoWithSubject();
    result.userId = existUser.id;
    result.fullname = existUser.fullname;
    result.email = existUser.email;
    result.userSubjects = existUser.userSubjects.map((userSubject) => {
      return {
        subjectId: userSubject.subject.id,
        subjectName: userSubject.subject.title,
        note: userSubject.value,
        final:
          userSubject.status === StatusSubject.CURRENT
            ? "No Finalizado"
            : this.calculateFinal(userSubject.value),
      };
    });
    return result;
  }

  async findReprovedById(userId): Promise<UserDtoWithSubject> {
    const existUser = await this._user.findUserWithSubjectsByUserId(userId);
    if (!existUser) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const result: UserDtoWithSubject = new UserDtoWithSubject();
    result.userId = existUser.id;
    result.fullname = existUser.fullname;
    result.email = existUser.email;
    result.userSubjects = existUser.userSubjects
      .filter((userSubject) => {
        return (
          userSubject.value < 3 && userSubject.status === StatusSubject.FINISHED
        );
      })
      .map((userSubject) => {
        return {
          subjectId: userSubject.subject.id,
          subjectName: userSubject.subject.title,
          note: userSubject.value,
        };
      });
    return result;
  }

  private calculateFinal(value: number): string {
    if (value > 3) {
      return "Aprobado";
    }
    return "Reprobado";
  }

  async findAll(): Promise<UserSubjectDto[]> {
    return this.userSubjectMapper.asyncArrayDto(
      await this.userSubjectRepository.find({
        relations: { user: true, subject: true },
      })
    );
  }
}
