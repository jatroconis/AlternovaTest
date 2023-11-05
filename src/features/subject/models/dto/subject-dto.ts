import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class SubjectDto {
  @AutoMap()
  @ApiProperty({ type: Number })
  subjectId: number;
  @AutoMap()
  @ApiProperty({ type: String })
  title: string;
  @AutoMap()
  @ApiProperty({ type: String })
  message: string;
  // @AutoMap(() => UserDto)
  // @ApiProperty({ type: () => UserDto })
  // user: UserDto;
}
