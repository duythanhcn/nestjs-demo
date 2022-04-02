import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { CreateUserInputDto } from '../users/users.dto';
import { CreateUsersPipe } from '../users/users.pipe';
import { AuthenService } from './authen.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthenGuard } from './local-authen.guard';

@Controller()
export class AuthenController extends BaseController {
  constructor(private readonly authenService: AuthenService) {
    super();
  }

  @Post('auth/register')
  async register(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    await this.authenService.register(body);
    return this.response();
  }

  @UseGuards(LocalAuthenGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const data = await this.authenService.login(req.user);
    return this.response(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: any) {
    await this.authenService.logout(req.user);
    return this.response();
  }
}
