import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.quizzesService.create(userId);
  }

  @UseGuards(AuthGuard)
  @Post('submit')
  subimit(@Req() request: Request, @Body()submitQuiz: SubmitQuizDto) {
    const userId = request['user'].sub;
    return this.quizzesService.submit(userId, submitQuiz);
  }
}
