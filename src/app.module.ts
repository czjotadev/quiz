import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionsModule } from './questions/questions.module';
import { AlternativesModule } from './alternatives/alternatives.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    QuizzesModule,
    QuestionsModule,
    AlternativesModule,
    RankingModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
