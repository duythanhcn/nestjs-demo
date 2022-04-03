import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
require('dotenv').config();

@Injectable()
export class AuthoService {
  constructor(private usersService: UsersService) {}

  /**
   *
   * @param userId
   * @returns string[]
   */
  async getUserPermissions(userId: number): Promise<string[]> {
    try {
      return await this.usersService.getUserPermissions(userId);
    } catch (e) {
      throw e;
    }
  }
}
