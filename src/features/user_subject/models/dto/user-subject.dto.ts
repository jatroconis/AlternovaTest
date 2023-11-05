import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Subject } from "src/features/subject/models/domain/subject";
import { User } from "src/features/user/models/domain/user";

export class UserSubjectDto {
  @AutoMap()
  @ApiProperty({ type: Number })
  userSubjectId?: number;
  @AutoMap(() => UserSubjectDto)
  @ApiProperty({ type: () => User })
  user?: User;
  @ApiProperty({ type: () => Subject })
  subject?: Subject;
}
