import {
  Body,
  Controller,
  Get,
  Post,
  Req,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodPipe(SignupSchema))
  async signup(@Body() data: User) {
    return this.authService.signup(data);
  }
}
