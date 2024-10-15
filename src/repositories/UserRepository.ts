import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, MysqlDataSource.manager);
  }

  /**
   * Busca um usuário com base no email
   * @param email E-mail do usuário
   * @returns O usuário encontrado ou undefined
   */
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  /**
   * Cria ou atualiza um usuário, caso ele exista
   * @param name Nome do usuário
   * @param email E-mail do usuário
   * @param password Senha do usuário
   * @param role Permissões do usuário
   */
  async saveUser(
    name: string,
    email: string,
    password: string,
    role: Role
  ): Promise<User | undefined> {
    return this.save({
      name: name,
      password: password,
      email: email,
      roles: [role]
    });
  }
}
