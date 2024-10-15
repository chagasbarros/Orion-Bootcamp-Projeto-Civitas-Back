import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Role } from '../entity/Role';
import { enumRoles } from '../models/enums/EnumRoles';

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, MysqlDataSource.manager);
  }

  /**
   * Cria ou atualiza uma role no banco de dados
   * @param role Role a ser guardada no banco de dados
   * @param description Descrição da role
   * @returns Objeto salvo no banco de dados
   */
  async saveRole(role: enumRoles, description: string) {
    return this.save({
      authType: role,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Retorna um nível de permissão de acordo com seu nome
   * @param name Nome do nível de permissão
   * @returns Role do nível de permissão
   */
  async findRoleByName(name: string): Promise<Role | undefined> {
    const authType: enumRoles = enumRoles[name as keyof enumRoles];
    return this.findOne({ where: { authType: authType } });
  }
}
