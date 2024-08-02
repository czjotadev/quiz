import { IsArray, IsNumber } from "class-validator";

export class SubmitQuizDto {
    @IsNumber()
    quizId: number;

    @IsArray()
    questions: {
        id: number;
        alternativeId: number;
    }[];
}
