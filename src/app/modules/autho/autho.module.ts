import { Module } from '@nestjs/common';
import { AuthoController } from './autho.controller';
import { AuthoService } from './autho.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthoService],
  controllers: [AuthoController],
  exports: [AuthoService],
})
export class AuthoModule {}
