import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../models/login-dto";
import { AuthService } from "../services/auth.service";
import { UserLoginDto } from "../models/user-login-dto";
import { RegisterDto } from "../models/register-dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly _auth: AuthService) {}

  @ApiOkResponse({ type: UserLoginDto })
  @Post("login")
  login(@Body() loginDto: LoginDto): Promise<UserLoginDto> {
    return this._auth.login(loginDto);
  }

  @ApiOkResponse({ type: RegisterDto })
  @Post("register")
  register(@Body() registerDto: RegisterDto): Promise<RegisterDto> {
    return this._auth.register(registerDto);
  }
}
