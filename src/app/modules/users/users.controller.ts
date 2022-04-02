import {
  Controller,
  Body,
  Post,
  Put,
  Delete,
  Get,
  Query,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorMessage } from '../../../common/messages';
import { BaseController } from '../../../common/base/base.controller';
import {
  CreateUserInputDto,
  DeleteUserInputDto,
  GetUserInputDto,
  UpdateUserInputDto,
} from './users.dto';
import {
  CreateUsersPipe,
  DeleteUsersPipe,
  GetUsersPipe,
  UpdateUsersPipe,
} from './users.pipe';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../authen/jwt-auth.guard';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private userService: UsersService) {
    super();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addUser(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Post('/form')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('user'))
  async addUserForm(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body(new UpdateUsersPipe()) body: UpdateUserInputDto) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.userService.updateUser(body);
    return this.response();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body(new DeleteUsersPipe()) body: DeleteUserInputDto) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.userService.deleteUser(body);
    return this.response();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Query(new GetUsersPipe()) params: GetUserInputDto) {
    const data = await this.userService.getUsers(params);
    return this.response(data);
  }
}
