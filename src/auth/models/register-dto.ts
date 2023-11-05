import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
