import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OTPService } from 'src/common/utils/email/createOTP';
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from 'src/common/utils/email/email.events';
import { tamplate } from 'src/common/utils/email/generateHTML';
import { OTPTypeEnum } from 'src/db/models/otp.model';
import { User } from 'src/db/models/user.model';
import { UserRepo } from 'src/db/repo/user.repo';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly otpService: OTPService,
  ) {}

  async signup(data: User) {
    const { age, email, gender, name, password } = data;
    const isEmailExist = await this.userRepo.findByEmail(email);
    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userRepo.create({
      data: {
        age,
        email,
        gender,
        name,
        password,
      },
    });

    const otp = await this.otpService.createOtp({
      userId: user._id,
      type: OTPTypeEnum.VERIFY_EMAIL,
    });

    const html = tamplate({
      code: otp,
      name: user.name,
      subject: 'verify your email',
    });

    emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
      to: email,
      subject: 'verify your email',
      html,
    });
    return user;
  }
}
