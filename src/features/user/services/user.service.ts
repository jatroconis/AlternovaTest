import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/core/utilities/crud-service";
import { decrypt } from "src/core/utilities/crypto";
import {
  BAD_PASSWORD,
  NOT_FOUND,
  REPEAT,
} from "src/core/utilities/error-message";
import { Repository } from "typeorm";
import { User } from "../models/domain/user";
import { UserDto } from "../models/dto/user-dto";
import { UserMapper } from "../profile/user-mapper";

@Injectable()
export class UserService implements CrudService<UserDto> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userMapper: UserMapper,
  ) {}

  async save(objectDto: UserDto): Promise<UserDto> {
    const existsByEmail = await this.userRepository.findOneBy({
      email: objectDto.email,
    });
    if (!!existsByEmail) throw new HttpException(REPEAT.reason, REPEAT.status);
    const user = await this.userRepository.save(
      this.userMapper.toDomain(objectDto),
    );
    return this.userMapper.toDto(user);
  }

  async update(objectDto: UserDto): Promise<UserDto> {
    const exists = await this.findById(objectDto.userId);
    if (!exists) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const user = await this.userRepository.save(
      this.userMapper.toDomain(objectDto),
    );
    return this.userMapper.toDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    return this.userMapper.asyncArrayDto(await this.userRepository.find());
  }

  async findById(objectId: number): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id: objectId });
    if (!user) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    return this.userMapper.toDto(user);
  }

  async findByName(fullname: string): Promise<UserDto> {
    return this.userMapper.asyncToDto(
      await this.userRepository.findOneBy({ fullname }),
    );
  }

  async deleteById(objectId: number): Promise<string> {
    const user = await this.findById(objectId);
    if (!user) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    await this.userRepository.delete(objectId);
    return "";
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    const decryptPassword = decrypt(user.password);
    if (decryptPassword !== password)
      throw new HttpException(BAD_PASSWORD.reason, BAD_PASSWORD.status);
    return this.userMapper.toDto(user);
  }

  async findByEmail(email: string): Promise<UserDto> | null {
    return this.userMapper.asyncToDto(
      await this.userRepository.findOneBy({ email }),
    );
  }
}
