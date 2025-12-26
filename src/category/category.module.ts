import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtService } from 'src/common/utils/security/token';
import { JwtService as JWT } from "@nestjs/jwt";
import { UserRepo } from 'src/db/repo/user.repo';
import { BrandRepo } from 'src/db/repo/brand.repo';
import { UserModel } from 'src/db/models/user.model';
import { CategoryModel } from 'src/db/models/category.model';
import { BrandModel } from 'src/db/models/brand.model';
import { CategoryRepo } from 'src/db/repo/categoryd.repo';

@Module({
  imports:[UserModel,CategoryModel,BrandModel],
  controllers: [CategoryController],
  providers: [CategoryService,JwtService,JWT,UserRepo,BrandRepo,CategoryRepo]
})
export class CategoryModule {}
