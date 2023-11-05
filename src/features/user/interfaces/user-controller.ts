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
import { UserDto } from "../models/dto/user-dto";
import { UserService } from "../services/user.service";
import { BadRequest } from "../../../core/models/bad-request";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly _user: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post()
  save(@Body() userDto: UserDto) {
    return this._user.save(userDto);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Put()
  update(@Body() userDto: UserDto) {
    return this._user.update(userDto);
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get()
  findAll() {
    return this._user.findAll();
  }

  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get(":userId")
  findById(@Param("userId") userId: number) {
    return this._user.findById(userId);
  }

  @ApiBadRequestResponse({ type: BadRequest })
  @Delete(":userId")
  deleteById(@Param("userId") userId: number) {
    return this._user.deleteById(userId);
  }
}
