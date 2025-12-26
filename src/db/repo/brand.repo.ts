import { Injectable } from '@nestjs/common';
import { DBRepo } from './db.repo';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandRepo extends DBRepo<Brand> {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {
    super(brandModel);
  }
  
}