import { Module } from '@nestjs/common';
import { RolesPermissionService } from './roles-permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermissionsRepository } from '../../repositories/roles-permissions.repository';
import { RolesPermissionsController } from './roles-permissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermissionsRepository])],
  providers: [RolesPermissionService],
  exports: [RolesPermissionService],
  controllers: [RolesPermissionsController],
})
export class RolesPermissionsModule {}
