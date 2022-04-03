import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import { AuthenModule } from './app/modules/authen/authen.module';
import mySql from './configs/mySql';
import { AuthoModule } from './app/modules/autho/autho.module';
import { RolesModule } from './app/modules/roles/roles.module';
import { PermissionsModule } from './app/modules/permissions/permissions.module';
import { RolesPermissionsModule } from './app/modules/roles-permissions/roles-permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(mySql),
    UsersModule,
    AuthenModule,
    AuthoModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
