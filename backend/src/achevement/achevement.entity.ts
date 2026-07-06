import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achevement {
  @PrimaryGeneratedColumn()
  achevement_id!: number;

  @Column()
  achevement_name!: string;

  @Column()
  achevement_date!: Date;
}