import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BadRequest } from "../../../core/models/bad-request";
import { AuthGuard } from "@nestjs/passport";
import { UserSubjectDto } from "../models/dto/user-subject.dto";
import { UserSubjectService } from "../services/user-subject.service";
import { UserDtoWithSubject } from "src/features/user/models/dto/user-dto";

@Controller("users-subjects")
@ApiTags("Users Subjects")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class UserSubjectController {
  constructor(private readonly _userSubject: UserSubjectService) {}

  @ApiOkResponse({ type: UserSubjectDto, isArray: true })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get()
  findAll() {
    return this._userSubject.findAll();
  }

  @ApiOkResponse({ type: UserSubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post("/finish")
  finishSubject(@Body() userSubjectDto: UserSubjectDto) {
    return this._userSubject.finish(userSubjectDto);
  }

  @ApiOkResponse({ type: UserSubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post()
  save(@Body() userSubjectDto: UserSubjectDto) {
    return this._userSubject.save(userSubjectDto);
  }

  @ApiOkResponse({ type: UserDtoWithSubject })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get(":userId")
  findById(@Param("userId") userId: number) {
    return this._userSubject.findSubjectsByUserId(userId);
  }

  @ApiOkResponse({ type: UserDtoWithSubject })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get("resume/:userId")
  findResumeById(@Param("userId") userId: number) {
    return this._userSubject.findResumeById(userId);
  }

  @ApiOkResponse({ type: UserDtoWithSubject })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get("reproved/:userId")
  findReprovedById(@Param("userId") userId: number) {
    return this._userSubject.findReprovedById(userId);
  }
}
