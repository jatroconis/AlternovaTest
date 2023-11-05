import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDto } from "src/features/user/models/dto/user-dto";
import { UserService } from "src/features/user/services/user.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UserService) private readonly _user: UserService;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "bDC^$yfQE$4q*z2",
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this._user.findById(+payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

interface JwtPayload {
  userId: string;
}
