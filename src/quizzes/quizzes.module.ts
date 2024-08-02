import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, PrismaClient],
})
export class QuizzesModule {}
