import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/features/user/models/dto/user-dto";

export class UserLoginDto {
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  token: string;
}
