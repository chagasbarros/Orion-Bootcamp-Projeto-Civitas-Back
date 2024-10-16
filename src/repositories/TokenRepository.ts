import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Token } from '../entity/Token';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, MysqlDataSource.manager);
  }

  /**
   * Cria ou atualiza um token, caso exista um vencido, do usuário
   * @param token Token criado com JWT
   * @param expiresAt Data da expiração do token
   * @param userId Id do usuário
   */
  async saveToken(
    token: string,
    expiresAt: Date,
    userId: number
  ): Promise<void> {
    await this.save({
      token: token,
      expiresAt: expiresAt,
      userId: userId
    });
  }
}
