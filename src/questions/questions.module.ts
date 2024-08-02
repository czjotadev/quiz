import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaClient],
})
export class QuestionsModule {}
