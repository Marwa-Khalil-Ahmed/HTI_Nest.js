import { Injectable } from '@nestjs/common';
import { DBRepo } from './db.repo';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../models/brand.model';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryRepo extends DBRepo<Category> {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {
    super(categoryModel);
  }
  
}