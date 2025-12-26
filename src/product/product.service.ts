import { Injectable, NotFoundException } from '@nestjs/common';
import { hydratedProduct } from 'src/db/models/product.model';
import { BrandRepo } from 'src/db/repo/brand.repo';
import { CategoryRepo } from 'src/db/repo/categoryd.repo';
import { ProductRepo } from 'src/db/repo/product.repo';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepo:ProductRepo,
        private readonly brandRepo:BrandRepo,
        private readonly categoryRepo:CategoryRepo
    ){}

    async createProduct(data:Partial<hydratedProduct>){
            const isCategoryExist=await this.categoryRepo.findById({
                id:data.category
            })
            
            const [category,brand]=await Promise.all([
                this.categoryRepo.findById({
                    id:data.category
                }),
                this.brandRepo.findById({
                    id:data.brand
                })
            ])
            if(!category){
                throw new NotFoundException("category not found")
            }
            if(!brand){
                throw new NotFoundException("brand not found")
            }

            return {
                data:await this.productRepo.create({
                    data
                })
            }
        }
}
