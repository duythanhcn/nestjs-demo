import { EntityRepository, Repository, Like } from 'typeorm';
import { Permissions } from '../entities/permissions.entity';
import { RolesPermissions } from '../entities/roles-permissions.entity';
import { Roles } from '../entities/roles.entity';
import { Users } from '../entities/users.entity';
import { UsersData } from '../modules/users/users.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  /**
   *
   * @param userName
   * @param offset
   * @param numRecords
   * @returns
   */
  async getUsers(
    userName: string,
    offset: number,
    numRecords: number,
  ): Promise<[UsersData[], number]> {
    const users = await this.findAndCount({
      select: ['userId', 'userName', 'firstName', 'lastName', 'address', 'age'],
      where: { userName: Like(`%${userName}%`) },
      order: { userId: 'ASC' },
      skip: offset,
      take: numRecords,
    });
    return users;
  }

  /**
   *
   * @param userName
   * @returns
   */
  async getUserByName(userName: string): Promise<Users> {
    const users = await this.findOne({
      where: { userName: userName },
    });
    return users;
  }

  /**
   *
   * @param userId
   * @returns string[]
   */
  async getUserPermissions(userId: number): Promise<string[]> {
    const permissions = await this.createQueryBuilder('user')
      .select(['per.permission_name AS permission'])
      .innerJoin(Roles, 'role', 'user.role_id = role.role_id')
      .innerJoin(RolesPermissions, 'rlp', 'rlp.role_id = role.role_id')
      .innerJoin(Permissions, 'per', 'per.permission_id = rlp.permission_id')
      .where('user.user_id = :userId', { userId: userId })
      .getRawMany();
    return permissions.map((a) => a.permission);
  }

  /**
   *
   * @param userId
   * @returns
   */
  async getUserRole(userId: number): Promise<Users> {
    return await this.findOne(userId, {
      relations: ['role'],
    });
  }
}
