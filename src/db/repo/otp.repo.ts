import { Injectable } from '@nestjs/common';
import { DBRepo } from './db.repo';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OTP } from '../models/otp.model';

@Injectable()
export class OTPRepo extends DBRepo<OTP> {
  constructor(@InjectModel(OTP.name) private readonly otpModel: Model<OTP>) {
    super(otpModel);
  }
}
