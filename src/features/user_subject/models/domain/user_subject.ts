import { AutoMap } from "@automapper/classes";
import { Subject } from "src/features/subject/models/domain/subject";
import { User } from "src/features/user/models/domain/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_subjects")
export class UserSubject {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @ManyToOne(() => User, {
    nullable: false,
    createForeignKeyConstraints: true,
  })
  user: User;

  @ManyToOne(() => Subject, {
    nullable: false,
    createForeignKeyConstraints: true,
  })
  subject: Subject;

  @AutoMap()
  @Column({ type: "double", nullable: false, default: 0.0 })
  value: number;
}
