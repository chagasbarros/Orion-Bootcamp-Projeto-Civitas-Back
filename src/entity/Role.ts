import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { User } from './User';

export enum enumRoles {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  TUTOR = 'TUTOR'
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  public setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public setUpdateAt(): void {
    this.updatedAt = new Date();
  }

  @ManyToMany(() => User)
  @JoinTable({ name: 'roles_users' })
  users: User[];
}
