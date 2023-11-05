import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/core/utilities/crud-service";
import { NOT_FOUND, REPEAT } from "src/core/utilities/error-message";
import { Repository } from "typeorm";
import { Subject } from "../models/domain/subject";
import { SubjectDto } from "../models/dto/subject-dto";
import { SubjectMapper } from "../profile/subject-mapper";

@Injectable()
export class SubjectService implements CrudService<SubjectDto> {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly _subjectMapper: SubjectMapper
  ) {}

  async save(objectDto: SubjectDto): Promise<SubjectDto> {
    const isExists = await this.findByName(objectDto.title);
    if (isExists) throw new HttpException(REPEAT.reason, REPEAT.status);
    const subject = await this.subjectRepository.save(
      this._subjectMapper.toDomain(objectDto)
    );
    return this._subjectMapper.toDto(subject);
  }

  async findByName(title: string): Promise<SubjectDto> {
    return this._subjectMapper.asyncToDto(
      await this.subjectRepository.findOneBy({ title })
    );
  }

  async update(objectDto: SubjectDto): Promise<SubjectDto> {
    const exists = await this.findById(objectDto.subjectId);
    if (!exists) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const subject = await this.subjectRepository.save(
      this._subjectMapper.toDomain(objectDto)
    );
    return this._subjectMapper.toDto(subject);
  }

  async findAll(): Promise<SubjectDto[]> {
    return this._subjectMapper.asyncArrayDto(
      await this.subjectRepository.find()
    );
  }

  async findById(objectId: number): Promise<SubjectDto> {
    const subject = await this.subjectRepository.findOneBy({ id: objectId });
    if (!subject) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    return this._subjectMapper.toDto(subject);
  }

  async deleteById(objectId: number): Promise<string> {
    const exists = await this.findById(objectId);
    if (!exists) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    this.subjectRepository.delete(objectId);
    return "";
  }
}
