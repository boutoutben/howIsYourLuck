import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryColumn()
    contact_id!: number;

    @Column()
    contact_name!: string;

    @Column()
    contact_role!: string;

    @Column()
    contact_img!: string;

}