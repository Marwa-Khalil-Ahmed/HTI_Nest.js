import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '../utils/security/token';
import { Request } from 'express';
import { UserRepo } from 'src/db/repo/user.repo';
import { User } from 'src/db/models/user.model';
import { HydratedDocument } from 'mongoose';
export interface AuthReq extends Request{
    user:HydratedDocument<User>
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
     private readonly userRepo:UserRepo
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: AuthReq = context.switchToHttp().getRequest();
      const auth = req.headers.authorization;
      if (!auth?.startsWith(process.env.BEARER as string)) {
        throw new BadRequestException('in-valid token');
      }
      const token = auth.split(' ')[1];
      const payload = await this.jwtService.verify({
        token,
        options: {
          secret: process.env.LOGIN_SECRET,
        },
      });
      const user=await this.userRepo.findById({
        id:payload._id
      })
      if(!user){
        throw new BadRequestException("user is Deleted")
      }
      if(!user.isConfirmed){
        throw new BadRequestException("email not confirmed")
      }
      req.user=user
      return true
    } catch (err) {
      throw new BadRequestException({ AuthErr: err });
    }
  }
}
