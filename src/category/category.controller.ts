import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard, type AuthReq } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/utils/multer/upload';
import { hydratedCategory } from 'src/db/models/category.model';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{
        storage: storage('category')
    }))
    async createCategory(@Req() req:AuthReq){
        const data:Partial<hydratedCategory>={
            name:req.body.name,
            createdBy:req.user._id,
            image:req.file?.path
        }

        return {
            data: await this.categoryService.createCategory(data)
        }
    }

    @Get()
    async findAll(){
        return{
            data:await this.categoryService.findAll()
        }
    }
}
