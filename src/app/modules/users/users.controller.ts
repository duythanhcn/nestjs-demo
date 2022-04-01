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

@Controller('users')
export class UsersController extends BaseController {
  constructor(private userService: UsersService) {
    super();
  }
  @Post()
  async addUser(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Post('/form')
  @UseInterceptors(FileInterceptor('user'))
  async addUserForm(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Put()
  async updateUser(@Body(new UpdateUsersPipe()) body: UpdateUserInputDto) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.userService.updateUser(body);
    return this.response();
  }

  @Delete()
  async deleteUser(@Body(new DeleteUsersPipe()) body: DeleteUserInputDto) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.userService.deleteUser(body);
    return this.response();
  }

  @Get()
  async getUsers(@Query(new GetUsersPipe()) params: GetUserInputDto) {
    const data = await this.userService.getUsers(params);
    return this.response(data);
  }
}
