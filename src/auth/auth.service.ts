import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OTPService } from 'src/common/utils/email/createOTP';
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from 'src/common/utils/email/email.events';
import { tamplate } from 'src/common/utils/email/generateHTML';
import { comparehash, createHash } from 'src/common/utils/security/hash';
import { JwtService } from 'src/common/utils/security/token';
import { OTPTypeEnum } from 'src/db/models/otp.model';
import { User } from 'src/db/models/user.model';
import { UserRepo } from 'src/db/repo/user.repo';
import { string } from 'zod';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly otpService: OTPService,
    private readonly jwtService: JwtService
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
        password:await createHash(password),
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
    return {data:user};
  }

  async confirmEmail(data: { 
    otp: string; 
    email: string 
  }) {
    const isEmailExist=await this.userRepo.findByEmail(data.email);
    if (!isEmailExist) {
      throw new NotFoundException('Email not found');
    }
    await this.otpService.validationOtp({
      otp:data.otp,
      userId: isEmailExist._id,
      type: OTPTypeEnum.VERIFY_EMAIL,
    })
    isEmailExist.isConfirmed=true

    return{
      msg:"success",
      data:{}
    }
  }

  async resendOtp(data:{
    email:string
  }){
    const isEmailExist=await this.userRepo.findByEmail(data.email);
    if (!isEmailExist) {
      throw new NotFoundException('Email not found');
    }
    if(isEmailExist.isConfirmed){
      throw new BadRequestException("email already verified")
    }
    const otp = await this.otpService.createOtp({
      userId: isEmailExist._id,
      type: OTPTypeEnum.VERIFY_EMAIL,
    });
    const html = tamplate({
      code: otp,
      name: isEmailExist.name,
      subject: 'verify your email',
    });
    emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
      to: isEmailExist.email,
      subject: 'verify your email',
      html,
    });
    return {
      data:{},
      msg:"Done"
    }
  }

  async login({email,password}:{
    email:string,
    password:string
  }){
    const user=await this.userRepo.findByEmail(email)
    if(!user){
      throw new BadRequestException("in-vaild credentials")
    }
    if(!await comparehash(password,user.password)){
      throw new BadRequestException("in-valid credentials")
    }
    const payload={
      _id:user._id,
      email:user.email
    }
    const token=this.jwtService.sign({
      payload,
      options:{
        expiresIn:"15 m",
        secret:process.env.LOGIN_SECRET
      }
    })
    return {
      data:{
        token
      }
    }
  }
}
