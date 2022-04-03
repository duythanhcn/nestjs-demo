import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate } from '../../../common/utils/paginator';
import { ErrorMessage } from '../../../common/messages';
import { Users } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';
import {
  CreateUserInputDto,
  DeleteUserInputDto,
  GetUserInputDto,
  RegisterInputDto,
  UpdateUserInputDto,
  UserDataResponse,
  UserLogin,
} from './users.dto';
import { RolesService } from '../roles/roles.service';
import { RolesEnum } from '../../../common/constants';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesService: RolesService,
  ) {}

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
      if (await this.checkUserByUserName(data.userName)) {
        throw new BadRequestException(ErrorMessage.DUPLICATED);
      }
      const user = new Users();
      user.userName = data.userName;
      user.password = data.password;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.age = data.age;
      user.role = await this.rolesService.getRoleByName(data.role);
      this.usersRepository.save(user);
      return;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param data
   * @returns
   */
  async register(data: RegisterInputDto) {
    try {
      if (await this.checkUserByUserName(data.userName)) {
        throw new BadRequestException(ErrorMessage.DUPLICATED);
      }
      const user = new Users();
      user.userName = data.userName;
      user.password = data.password;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.age = data.age;
      user.role = await this.rolesService.getRoleByName(RolesEnum.GUEST);
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
  async updateUser(data: UpdateUserInputDto): Promise<any> {
    try {
      const user = await this.usersRepository.findOne(data.userId);
      if (!user) {
        throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
      }
      if (data.password) {
        user.password = data.password;
      }
      if (data.lastName) {
        user.lastName = data.lastName;
      }
      if (data.firstName) {
        user.firstName = data.firstName;
      }
      if (data.firstName) {
        user.firstName = data.firstName;
      }
      if (data.age) {
        user.age = data.age;
      }
      if (data.role) {
        user.role = await this.rolesService.getRoleByName(data.role);
      }
      return await this.usersRepository.save(user);
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param data : DeleteUserInputDto
   * @returns
   */
  async deleteUser(data: DeleteUserInputDto): Promise<any> {
    try {
      const user = await this.usersRepository.findOne(data.userId);
      if (!user) {
        throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
      }
      return await this.usersRepository.delete(user);
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param params {userName?: string, page: number, numRecords: number}
   * @returns UserDataResponse
   */
  async getUsers(params: GetUserInputDto): Promise<UserDataResponse> {
    try {
      const offset = (params.page - 1) * params.numRecords;
      const data = await this.usersRepository.getUsers(
        params.userName,
        offset,
        params.numRecords,
      );
      const pager = paginate(data[1], params.numRecords, params.page);
      return { data: data[0], pager };
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userName
   * @returns
   */
  async getUserByName(userName: string): Promise<UserLogin> {
    try {
      const user = await this.usersRepository.getUserByName(userName);
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<UserLogin> {
    try {
      const user = await this.usersRepository.findOne(userId);
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @param accessToken
   * @param refreshToken
   * @returns
   */
  async login(
    userId: number,
    accessToken: string,
    refreshToken: string,
  ): Promise<any> {
    try {
      return await this.usersRepository.update(userId, {
        accessToken,
        refreshToken,
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  async logout(userId: number): Promise<any> {
    try {
      return await this.usersRepository.update(userId, {
        accessToken: null,
        refreshToken: null,
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @returns string[]
   */
  async getUserPermissions(userId: number): Promise<string[]> {
    try {
      return await this.usersRepository.getUserPermissions(userId);
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param userId
   * @param role : RolesEnum
   * @returns
   */
  async checkUserPermission(userId: number, role: RolesEnum): Promise<boolean> {
    const user = await this.usersRepository.getUserRole(userId);
    if (!user || (user && !user.role)) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    const userRole = user.role;
    if (userRole.roleName == role) {
      return true;
    }
    return false;
  }
}
