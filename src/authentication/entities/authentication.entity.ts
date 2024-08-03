import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("login")
export class AuthenticationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(partial ?: Partial<AuthenticationEntity>) {
    Object.assign(this, partial);
  }
}
