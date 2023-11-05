import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/core/utilities/status";

export class UserDto {
  @AutoMap()
  @ApiProperty({ type: Number })
  userId?: number;
  @AutoMap()
  @ApiProperty({ type: String })
  fullname: string;
  @AutoMap()
  @ApiProperty({ type: String })
  email: string;
  @AutoMap()
  @ApiProperty({ type: String })
  password: string;
  @AutoMap()
  @ApiProperty({ type: "enum", enum: Status })
  status?: string;
}
