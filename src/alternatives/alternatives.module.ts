import { Module } from '@nestjs/common';
import { AlternativesService } from './alternatives.service';
import { AlternativesController } from './alternatives.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AlternativesController],
  providers: [AlternativesService, PrismaClient],
})
export class AlternativesModule {}
