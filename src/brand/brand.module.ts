import { Module } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";
import { UserModel } from "src/db/models/user.model";
import { JwtService } from "src/common/utils/security/token";
import { JwtService as JWT } from "@nestjs/jwt";
import { UserRepo } from "src/db/repo/user.repo";
import { BrandRepo } from "src/db/repo/brand.repo";
import { BrandModel } from "src/db/models/brand.model";

@Module({
    imports:[UserModel,BrandModel],
    providers:[BrandService,JwtService,JWT,UserRepo,BrandRepo],
    controllers:[BrandController]
})
export class BrandModule{}