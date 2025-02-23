import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class CategoryParamDto {
    
    @IsMongoId()
    categoryId: Types.ObjectId
}