import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    contact_id!: number;

    @Column()
    contact_name!: string;

    @Column()
    contact_role!: string;

    @Column()
    contact_img!: string;

}