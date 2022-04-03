import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users.repository';
import { AuthoService } from '../autho/autho.service';
import { RolesService } from '../roles/roles.service';
import { RolesRepository } from '../../repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, RolesRepository])],
  providers: [UsersService, AuthoService, RolesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
