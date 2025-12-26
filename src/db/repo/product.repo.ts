import { Injectable } from '@nestjs/common';
import { DBRepo } from './db.repo';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../models/brand.model';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepo extends DBRepo<Product> {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
  }
  
}