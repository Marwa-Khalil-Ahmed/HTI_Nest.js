import { Injectable } from '@nestjs/common';
import { DBRepo } from './db.repo';
import { User, UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepo extends DBRepo<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
  async findByEmail(email: string) {
    return await this.findOne({ filter: { email } });
  }
}
