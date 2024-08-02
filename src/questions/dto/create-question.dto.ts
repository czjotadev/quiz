import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {

    @IsNotEmpty()
    @IsString()
    description: string;
}
