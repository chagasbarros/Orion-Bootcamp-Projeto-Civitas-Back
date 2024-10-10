import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../entity/User';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, MysqlDataSource.manager);
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }
}
