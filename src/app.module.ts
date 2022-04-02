import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import { AuthenModule } from './app/modules/authen/authen.module';
import mySql from './configs/mySql';

@Module({
  imports: [TypeOrmModule.forRoot(mySql), UsersModule, AuthenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
