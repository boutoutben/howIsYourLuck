import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('app_user')
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    user_firstname!: string;

    @Column()
    user_lastname!: string;

    @Column()
    birth_day!: Date;

    @Column()
    email!: string;

    @Column()
    user_password!: string;

    @Column({
  type: 'varchar',
  nullable: true,
})
phone?: string;

    @Column("text", { array: true, default: [] })
    passions!: string[];

    @Column({ default: 0 })
    user_score!: number;

    @Column({nullable: true})
    last_increase!: Date;
}