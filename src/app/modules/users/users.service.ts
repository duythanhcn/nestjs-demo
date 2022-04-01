import { Injectable } from '@nestjs/common';
import { Users } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';
import {
  CreateUserInputDto,
  DeleteUserInputDto,
  GetUserInputDto,
  UpdateUserInputDto,
  UsersData,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   *
   * @param userName
   * @returns Boolean
   */
  async checkUserByUserName(userName: string): Promise<Boolean> {
    try {
      const user = await this.usersRepository.find({
        where: { userName: userName },
      });
      if (user.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @returns Boolean
   */
  async checkUserExistedId(userId: number): Promise<Boolean> {
    try {
      const user = await this.usersRepository.findOne(userId);
      if (user) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param data : CreateUserInputDto
   * @returns
   */
  async addUSer(data: CreateUserInputDto) {
    try {
      const user = new Users();
      user.userName = data.userName;
      user.password = data.password;
      this.usersRepository.save(user);
      return;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param data : UpdateUserInputDto
   * @returns
   */
  async updateUser(data: UpdateUserInputDto) {
    try {
      const user = await this.usersRepository.findOne(data.userId);
      if (user) {
        user.password = data.password;
        this.usersRepository.save(user);
      }
      return;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param data : DeleteUserInputDto
   * @returns
   */
  async deleteUser(data: DeleteUserInputDto) {
    try {
      const user = await this.usersRepository.findOne(data.userId);
      if (user) {
        this.usersRepository.delete(user);
      }
      return;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param params {userName?: string, page: number, numRecords: number}
   * @returns UsersData[]
   */
  async getUsers(params: GetUserInputDto): Promise<UsersData[]> {
    try {
      const offset = (params.page - 1) * params.numRecords;
      const users = await this.usersRepository.getUsers(
        params.userName,
        offset,
        params.numRecords,
      );
      return users;
    } catch (e) {
      throw e;
    }
  }
}
