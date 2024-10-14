import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { enumRoles } from '../models/enums/EnumRoles';
import { Token } from './Token';

@Entity('roles')
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: 'roles_users' })
  users: User[];

  @OneToMany(() => Token, (token) => token.role)
  tokens: Token[];

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
