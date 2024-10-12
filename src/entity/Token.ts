import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { Role } from './Role';

@Entity('Token')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  userId: number;

  // Alterar para AuthName quando o merge for criado
  @ManyToOne(() => Role, (role) => role.id)
  role: Role;
}
