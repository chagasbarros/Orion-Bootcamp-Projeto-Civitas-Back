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
import { enumRoles } from '../models/enums/EnumRoles';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'autenticacao',
    type: 'enum',
    enum: enumRoles
  })
  public authType: enumRoles;

  @Column()
  description: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.roles)
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
