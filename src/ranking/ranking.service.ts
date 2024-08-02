import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class RankingService {
  constructor(private prismaClient: PrismaClient) {}
  async findAll() {
    try {
      return await this.prismaClient
        .$queryRaw`select name, user_id, sum("result")::text as score from quizzes inner join users on quizzes.user_id  = users.id group by user_id, name order by score desc limit 10;`;
    } catch (error) {
      throw new HttpException(
        'Não foi possível retornar a listagem do rankig.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
