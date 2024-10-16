import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Token } from '../entity/Token';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, MysqlDataSource.manager);
  }
}
