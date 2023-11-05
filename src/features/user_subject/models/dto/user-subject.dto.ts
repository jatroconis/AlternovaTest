import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UserSubjectDto {
  @AutoMap()
  @ApiProperty({ type: Number })
  userSubjectId?: number;
}
