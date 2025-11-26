import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModel } from 'src/models/user.model';

@Module({
  imports: [UserModel],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
