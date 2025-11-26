import { Body, Controller, Get, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { TestPipe } from 'src/common/pipes/test.pipes';
import { SignupDTO } from './authDTO/signup.dto';
import { ZodPipe } from 'src/common/pipes/zod.pipe';
import { SignupSchema } from './authValidation/signup.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  @UsePipes(new ZodPipe(SignupSchema))
  async signup(@Body() body: SignupDTO) {
    return 'Done';
  }

  @Get('/test')
  async test(){
    return this.authService.test()
  }
}
