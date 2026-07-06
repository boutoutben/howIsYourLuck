import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Planning {
    @PrimaryGeneratedColumn()
    planning_id!: number;

    @Column()
    planning_name!: string;

    @Column()
    planning_date!: Date;

    @Column()
    planning_check!: boolean;

}