import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects")
export class Subject {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({ unique: true, length: 30, nullable: false })
  title: string;
  @AutoMap()
  @Column({ unique: true, length: 300, nullable: false })
  description: string;
  @Column({
    name: "created_date",
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;
}
