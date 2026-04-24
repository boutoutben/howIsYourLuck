import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Planning {
    @PrimaryColumn()
    planning_id!: number;

    @Column()
    planning_name!: string;

    @Column()
    planning_date!: Date;

    @Column()
    planning_check!: boolean;

}