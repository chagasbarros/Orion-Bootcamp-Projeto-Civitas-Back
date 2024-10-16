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

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'autenticacao',
    type: 'enum',
    enum: enumRoles
  })
  public authType: string;

  @Column()
  description: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: 'role_user' })
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
