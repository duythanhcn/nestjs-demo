import { EntityRepository, Repository, Like } from 'typeorm';
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
  ): Promise<UsersData[]> {
    const users = await this.find({
      where: { userName: Like(`%${userName}%`) },
      order: { userId: 'ASC' },
      skip: offset,
      take: numRecords,
    });
    return users;
  }
}
