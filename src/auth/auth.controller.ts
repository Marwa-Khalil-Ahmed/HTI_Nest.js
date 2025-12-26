import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { TestPipe } from 'src/common/pipes/test.pipes';
import { SignupDTO } from './authDTO/signup.dto';
import { ZodPipe } from 'src/common/pipes/zod.pipe';
import { SignupSchema } from './authValidation/signup.schema';
import { AuthService } from './auth.service';
import { User } from 'src/db/models/user.model';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SuccessHandlerInterceptor } from 'src/common/interceptors/morgan.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodPipe(SignupSchema))
  async signup(@Body() data: User) {
    return this.authService.signup(data);
  }

  @Post("confirmEmail")
  async confirmEmail(@Body() {otp,email}:{
    otp:string,
    email:string
  }){
    return this.authService.confirmEmail({
      email,
      otp
    })
  }

  @Post("resend-otp")
  async resendOtp(@Body() {email}){
    return this.authService.resendOtp({email})
  }

  @Post("login")
  async login(@Body() {email,password}:{
    email:string,
    password:string
  }){
    return this.authService.login({
      email,
      password
    })
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors(SuccessHandlerInterceptor)
  async me(@Req() {user}){
    return {data:user}
  }
}
