import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Role } from 'entity/Role';

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, MysqlDataSource.manager);
  }
}
