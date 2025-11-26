import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { SignupDTO } from "src/auth/authDTO/signup.dto";

@Injectable()
export class TestPipe implements PipeTransform{
    transform(value: SignupDTO, metadata: ArgumentMetadata) {
        console.log({value, metadata});
        
        if (value.password != value.confirmPassword) {
        throw new BadRequestException("password must be equal to confirm password")
    }
    }
}