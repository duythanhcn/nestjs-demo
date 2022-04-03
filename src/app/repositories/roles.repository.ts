import { EntityRepository, Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  /**
   *
   * @param roleName
   * @returns
   */
  async getRoleByName(roleName: string): Promise<Roles[]> {
    const roles = await this.find({
      where: { roleName: roleName },
    });
    return roles;
  }
}
