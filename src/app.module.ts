import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import mySql from './configs/mySql';

@Module({
  imports: [TypeOrmModule.forRoot(mySql), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
