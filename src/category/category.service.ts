import { BadRequestException, Injectable } from '@nestjs/common';
import { hydratedCategory } from 'src/db/models/category.model';
import { CategoryRepo } from 'src/db/repo/categoryd.repo';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepo:CategoryRepo
    ){}

    async createCategory(data:Partial<hydratedCategory>){
        const isCategory=await this.categoryRepo.findOne({
            filter:{
                name:data.name
            }
        })
        if(isCategory){
            throw new BadRequestException("category already exist")
        }
        const category=await this.categoryRepo.create({
            data
        })
        return category
    }

    async findAll(){
        const data=await this.categoryRepo.find({})
        return data
    }
}
