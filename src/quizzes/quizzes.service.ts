import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prismaClient: PrismaClient) {}
  async create(userId) {
    try {
      const quiz = await this.prismaClient.quiz.create({
        data: {
          userId,
        },
        select: {
          id: true,
        },
      });

      const questions = await this.prismaClient.question.findMany({
        select: {
          id: true,
          description: true,
          alternativies: {
            select: {
              id: true,
              description: true,
            },
            where: {
              deletedAt: null,
            },
          },
        },
        where: {
          deletedAt: null,
        },
        take: 12,
      });

      questions.map(async (question) => {
        await this.prismaClient.quizQuestion.createMany({
          data: {
            quizId: quiz.id,
            questionId: question.id,
          },
        });
      });

      return { quiz, questions };
    } catch (error) {
      throw new HttpException(
        'Não foi possível gerar o quiz',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async submit(userId, submitQuiz: SubmitQuizDto) {
    try {
      const { quizId, questions } = submitQuiz;

      this.prismaClient.quiz.findFirstOrThrow({
        where: {
          id: quizId,
          userId,
        },
      });

      const scorePromises = questions.map(async (question) => {
        const quizQuestion = await this.prismaClient.quizQuestion.findFirst({
          where: {
            questionId: question.id,
            quizId,
          },
        });

        if (quizQuestion.alternativeId)
          throw new HttpException(
            'Não foi possível responder ao quiz',
            HttpStatus.BAD_REQUEST,
          );

        await this.prismaClient.quizQuestion.update({
          where: {
            id: quizQuestion.id,
          },
          data: {
            alternativeId: question.alternativeId,
          },
        });

        const alternative = await this.prismaClient.alternative.findFirst({
          where: {
            id: question.alternativeId,
            questionId: question.id,
          },
        });
        return alternative.correct;
      });

      const score = await Promise.all(scorePromises);

      await this.prismaClient.quiz.update({
        where: {
          id: quizId,
        },
        data: {
          result: score.filter((value) => value === true).length,
        },
      });

      return { score: score.filter(value => value === true).length }

    } catch (error) {
      throw new HttpException(
        'Não foi possível responder ao quiz',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
