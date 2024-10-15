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

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()' })
  updateAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  //Methods
  @BeforeInsert()
  setCreatedAt() {
    console.log('Setting createdAt');
    this.createdAt = new Date();
  }
  @BeforeInsert()
  @BeforeUpdate()
  setUpdateAt() {
    this.updateAt = new Date();
  }
}
