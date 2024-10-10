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
import { enumRoles } from '../models/enums/roleEnum';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'autenticacao',
    type: 'enum',
    enum: enumRoles,
    default: enumRoles.TUTOR
  })
  public authType: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: 'roles_users' })
  users: User[];

  // Methods
  @BeforeInsert()
  public setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  public setUpdateAt(): void {
    this.updatedAt = new Date();
  }
}
