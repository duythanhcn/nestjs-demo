import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenController } from './authen.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRE_TIME) },
    }),
  ],
  providers: [AuthenService, LocalStrategy, JwtStrategy],
  exports: [AuthenService],
  controllers: [AuthenController],
})
export class AuthenModule {}
