import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModel } from 'src/db/models/user.model';
import { BrandModel } from 'src/db/models/brand.model';
import { CategoryModel } from 'src/db/models/category.model';
import { ProductModel } from 'src/db/models/product.model';
import { JwtService } from 'src/common/utils/security/token';
import { JwtService as JWT } from "@nestjs/jwt";
import { UserRepo } from 'src/db/repo/user.repo';
import { BrandRepo } from 'src/db/repo/brand.repo';
import { CategoryRepo } from 'src/db/repo/categoryd.repo';
import { ProductRepo } from 'src/db/repo/product.repo';

@Module({
  imports: [
    ProductModel, 
    UserModel, 
    BrandModel, 
    CategoryModel
  ],
  providers: [
    ProductService,
    JwtService,
    JWT,
    UserRepo,
    BrandRepo,
    CategoryRepo,
    ProductRepo
  ],
  controllers: [ProductController],
})
export class ProductModule {}
