import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany
} from 'typeorm';

import { Role } from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  //Methods
  @BeforeInsert()
  public setCreatedAt(): void {
    this.createdAt = new Date();
  }
  @BeforeInsert()
  @BeforeUpdate()
  public setUpdateAt(): void {
    this.updateAt = new Date();
  }
}
