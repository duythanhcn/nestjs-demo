import { EntityRepository, Repository } from 'typeorm';
import { RolesPermissions } from '../entities/roles-permissions.entity';
import { Roles } from '../entities/roles.entity';

@EntityRepository(RolesPermissions)
export class RolesPermissionsRepository extends Repository<RolesPermissions> {
  async getRolesPermissions() {
    const query = this.createQueryBuilder('per')
      .select(['role_name', 'permission'])
      .leftJoin(Roles, 'role', 'per.role_id = role.role_id');
    return query.getMany();
  }
}
