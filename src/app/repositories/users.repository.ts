import { EntityRepository, Repository, Like } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UserLogin, UsersData } from '../modules/users/users.dto';

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
  async getUserByName(userName: string): Promise<UserLogin> {
    const users = await this.findOne({
      where: { userName: userName },
    });
    return users;
  }
}
