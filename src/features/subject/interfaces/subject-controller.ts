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
import { SubjectDto } from "../models/dto/subject-dto";
import { BadRequest } from "../../../core/models/bad-request";
import { AuthGuard } from "@nestjs/passport";
import { SubjectService } from "../services/subject.service";

@Controller("subject")
@ApiTags("Subjects")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class SubjectController {
  constructor(private readonly _subject: SubjectService) {}

  @ApiOkResponse({ type: SubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post()
  save(@Body() subjectDto: SubjectDto) {
    return this._subject.save(subjectDto);
  }

  @ApiOkResponse({ type: SubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Put()
  update(@Body() subjectDto: SubjectDto) {
    return this._subject.update(subjectDto);
  }

  @ApiOkResponse({ type: SubjectDto, isArray: true })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get()
  findAll() {
    return this._subject.findAll();
  }

  @ApiOkResponse({ type: SubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get(":subjectId")
  findById(@Param("subjectId") subjectId: number) {
    return this._subject.findById(subjectId);
  }

  @ApiOkResponse({ type: SubjectDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get(":subjectName/name")
  findByName(@Param("subjectName") subjectName: string) {
    return this._subject.findByName(subjectName);
  }

  @ApiBadRequestResponse({ type: BadRequest })
  @Delete(":subjectId")
  deleteById(@Param("subjectId") subjectId: number) {
    return this._subject.deleteById(subjectId);
  }
}
