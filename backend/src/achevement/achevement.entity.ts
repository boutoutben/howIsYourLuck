import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Achevement {
  @PrimaryColumn()
  achevement_id!: number;

  @Column()
  achevement_name!: string;

  @Column()
  achevement_date!: Date;
}