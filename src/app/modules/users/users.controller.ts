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
  Req,
  ForbiddenException,
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
import { AuthoGuard } from '../autho/autho.guard';
import { PermissionAction, RolesEnum } from '../../../common/constants';
import { RequiresPermission } from '../autho/autho.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, AuthoGuard)
export class UsersController extends BaseController {
  constructor(private userService: UsersService) {
    super();
  }

  @Post()
  @RequiresPermission(PermissionAction.CREATE)
  async addUser(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Post('/form')
  @UseInterceptors(FileInterceptor('user'))
  @RequiresPermission(PermissionAction.CREATE)
  async addUserForm(@Body(new CreateUsersPipe()) body: CreateUserInputDto) {
    if (await this.userService.checkUserByUserName(body.userName)) {
      throw new BadRequestException(ErrorMessage.DUPLICATED);
    }
    await this.userService.addUSer(body);
    return this.response();
  }

  @Put()
  @RequiresPermission(PermissionAction.UPDATE)
  async updateUser(
    @Req() req: any,
    @Body(new UpdateUsersPipe()) body: UpdateUserInputDto,
  ) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    // only update themself - except ADMIN
    const user = req.user;
    const isAdmin = await this.userService.checkUserPermission(
      user.userId,
      RolesEnum.ADMIN,
    );
    if (user.userId !== body.userId && !isAdmin) {
      throw new ForbiddenException(ErrorMessage.PERMISSION_DENIED);
    }
    await this.userService.updateUser(body);
    return this.response();
  }

  @Delete()
  @RequiresPermission(PermissionAction.DELETE)
  async deleteUser(@Body(new DeleteUsersPipe()) body: DeleteUserInputDto) {
    if (!(await this.userService.checkUserExistedId(body.userId))) {
      throw new BadRequestException(ErrorMessage.DATA_NOT_FOUND);
    }
    await this.userService.deleteUser(body);
    return this.response();
  }

  @Get()
  @RequiresPermission(PermissionAction.LIST)
  async getUsers(@Query(new GetUsersPipe()) params: GetUserInputDto) {
    const data = await this.userService.getUsers(params);
    return this.response(data);
  }
}
