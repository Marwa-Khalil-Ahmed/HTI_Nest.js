import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { OTPTypeEnum } from 'src/db/models/otp.model';
import { OTPRepo } from 'src/db/repo/otp.repo';
import { createHash } from '../security/hash';

@Injectable()
export class OTPService {
  constructor(private readonly otpRepo: OTPRepo) {}

  async createOtp({
    type = OTPTypeEnum.VERIFY_EMAIL,
    userId,
  }: {
    type?: OTPTypeEnum;
    userId: Types.ObjectId;
  }) {
    const nanoid = customAlphabet('0123456789', 6);
    const otp = nanoid();
    const isOTPExist = await this.otpRepo.findOne({
      filter: {
        userId,
        type,
      },
    });

    if (isOTPExist && isOTPExist.expireIn > new Date(Date.now())) {
      throw new BadRequestException(
        'OTP already sent, please try after some time',
      );
    }

    if (!isOTPExist) {
      await this.otpRepo.create({
        data: {
          userId,
          type,
          expireIn: new Date(Date.now() + 30 * 1000),
          otp: await createHash(otp),
        },
      });
      return otp;
    } else {
      isOTPExist.otp = await createHash(otp);
      isOTPExist.expireIn = new Date(Date.now() + 30 * 1000);
      return otp;
    }
  }
}
