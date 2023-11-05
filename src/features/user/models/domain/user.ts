import { AutoMap } from "@automapper/classes";
import { Status } from "src/core/utilities/status";
import { UserSubject } from "src/features/user_subject/models/domain/user_subject";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({ length: 150, nullable: false })
  fullname: string;
  @AutoMap()
  @Column({ unique: true, length: 200, nullable: false })
  email: string;
  @AutoMap()
  @Column({ length: 255, nullable: false })
  password: string;
  @AutoMap()
  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status;
  @OneToMany(() => UserSubject, (userSubject) => userSubject.id)
  userSubjects: UserSubject[];
}
