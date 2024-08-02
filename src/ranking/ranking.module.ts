import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [RankingController],
  providers: [RankingService, PrismaClient],
})
export class RankingModule {}
