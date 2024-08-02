import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prismaClient: PrismaClient) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const { description } = createQuestionDto;

      const question = await this.prismaClient.question.create({
        data: {
          description,
        },
        select: {
          id: true,
        },
      });

      return question;
    } catch (error) {
      throw new HttpException(
        'Não foi possível cadastrar a questão',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaClient.question.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new HttpException(
        'Não foi possível listar as questões',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaClient.question.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new HttpException(
        'Não foi possível buscar a questão',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      await this.prismaClient.question.findFirstOrThrow({
        where: { id, deletedAt: null },
      });

      const { description } = updateQuestionDto;

      const question = this.prismaClient.question.update({
        data: {
          description,
        },
        where: {
          id,
        },
      });

      return question;
    } catch (error) {
      throw new HttpException(
        'Não foi possível editar a questão',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaClient.question.findFirstOrThrow({
        where: { id, deletedAt: null },
      });

      await this.prismaClient.question.delete({ where: { id } });

      return { message: 'Questão removida com sucesso!'}
    } catch (error) {
      throw new HttpException(
        'Não foi possível remover a questão',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
