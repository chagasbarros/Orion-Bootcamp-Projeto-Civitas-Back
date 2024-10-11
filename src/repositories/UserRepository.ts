import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../entity/User';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, MysqlDataSource.manager);
  }

  // busca um usuário com base no email
  // @param email E-mail do usuário
  // @returns O usuário encontrado ou undefined
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }
}
