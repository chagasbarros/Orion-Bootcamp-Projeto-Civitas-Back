import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Token } from '../entity/Token';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, MysqlDataSource.manager);
  }

  async saveToken(
    token: string,
    expiresAt: Date,
    userId: number
  ): Promise<void> {
    await this.save({ token: token, expiresAt: expiresAt, userId: userId });
  }

  async findTokenByUserIdAndRole(
    userId: number,
    role: string
  ): Promise<Token | undefined> {
    return this.findOne({ where: { userId } });
  }

  async removeToken(token: Token) {
    this.remove(token);
  }
}
