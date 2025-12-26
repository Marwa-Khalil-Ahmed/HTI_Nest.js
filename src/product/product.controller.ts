import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard, type AuthReq } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/utils/multer/upload';
import { hydratedCategory } from 'src/db/models/category.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Post()
        @UseGuards(AuthGuard)
        @UseInterceptors(FileInterceptor('image',{
            storage: storage('products')
        }))
        async createProduct(@Req() req:AuthReq){
            const data={
                ...req.body,
                createdBy:req.user._id,
                images:(req.files as Express.Multer.File[]).map(file=>file.path)
            }
    
            const product=await this.productService.createProduct(data)

            return {
                data:product.data
            }
        }
}
