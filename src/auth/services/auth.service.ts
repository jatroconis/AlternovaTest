import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NOT_FOUND, USED } from "src/core/utilities/error-message";
import { UserService } from "src/features/user/services/user.service";
import { LoginDto } from "../models/login-dto";
import { RegisterDto } from "../models/register-dto";
import { UserLoginDto } from "../models/user-login-dto";

@Injectable()
export class AuthService {
  @Inject(UserService) private readonly _user: UserService;

  constructor(private readonly _jwt: JwtService) {}

  async login({ email, password }: LoginDto): Promise<UserLoginDto> {
    const user = await this._user.findByEmailAndPassword(email, password);
    if (!user) throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
    return {
      user,
      token: this._jwt.sign({ userId: user.userId }),
    };
  }

  async register({
    email,
    fullname,
    password,
  }: RegisterDto): Promise<RegisterDto> {
    const user = await this._user.findByEmail(email);
    if (user) throw new HttpException(USED.reason, USED.status);
    return await this._user.save({
      email,
      fullname,
      password,
    });
  }
}
