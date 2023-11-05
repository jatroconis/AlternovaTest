import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/core/utilities/status";
import { UserSubjectDto } from "src/features/user_subject/models/dto/user-subject.dto";

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
  @ApiProperty({ type: () => UserSubjectDto, isArray: true })
  userSubjects?: UserSubjectDto[];
}

export class UserDtoWithSubject {
  @AutoMap()
  @ApiProperty({ type: Number })
  userId?: number;
  @AutoMap()
  @ApiProperty({ type: String })
  fullname?: string;
  @AutoMap()
  @ApiProperty({ type: String })
  email?: string;
  @AutoMap()
  @ApiProperty({ type: "enum", enum: Status })
  status?: string;
  @ApiProperty()
  userSubjects?: SubjectWithNote[];
  @ApiProperty()
  promediate?: number;
}

export interface SubjectWithNote {
  subjectId?: number;
  subjectName?: string;
  note?: number;
  final?: string;
}
