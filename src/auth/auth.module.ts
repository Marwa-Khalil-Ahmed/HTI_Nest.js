import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModel } from 'src/db/models/user.model';
import { UserRepo } from 'src/db/repo/user.repo';
import { OTPRepo } from 'src/db/repo/otp.repo';
import { OTPModel } from 'src/db/models/otp.model';
import { OTPService } from 'src/common/utils/email/createOTP';
import { JwtService } from 'src/common/utils/security/token';
import { JwtService as JWT} from '@nestjs/jwt';

@Module({
  imports: [UserModel, OTPModel],
  providers: [AuthService, UserRepo, OTPRepo, OTPService,JWT,JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
