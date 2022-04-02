import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { CreateUserInputDto, UserLogin } from '../users/users.dto';
import { UsersService } from '../users/users.service';
import { LoginRequestDto, LoginResponseDto } from './authen.dto';
require('dotenv').config();

@Injectable()
export class AuthenService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  /**
   *
   * @param user LoginRequestDto
   * @returns
   */
  async login(user: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const payload = { userName: user.userName, userId: user.userId };
      const accessToken = this.jwtService.sign(payload);
      const expiredTime: string = moment()
        .second(parseInt(process.env.JWT_EXPIRE_TIME))
        .toISOString();
      // update access token in DB
      // just for demo without redis
      await this.usersService.login(payload.userId, user.password, accessToken);
      return {
        user: { userId: user.userId, userName: user.userName },
        auth: {
          accessToken: accessToken,
          tokenType: 'Bearer',
          expired: expiredTime,
        },
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param params CreateUserInputDto
   */
  async register(params: CreateUserInputDto): Promise<any> {
    try {
      await this.usersService.addUSer(params);
    } catch (e) {
      throw e;
    }
  }

  async logout(user: UserLogin): Promise<any> {
    try {
      // update access token in DB
      // just for demo without redis
      return await this.usersService.logout(user.userId);
    } catch (e) {
      throw e;
    }
  }
}
