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
  description: string;
  @AutoMap()
  @ApiProperty({ type: Date })
  createdDate: Date;
}
