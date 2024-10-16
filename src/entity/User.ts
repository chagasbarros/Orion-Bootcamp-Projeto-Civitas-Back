import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  OneToMany
} from 'typeorm';

import { Role } from './Role';
import { Token } from './Token';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updateAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToMany(() => Token, (token) => token.userId)
  tokens: Token[];

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
