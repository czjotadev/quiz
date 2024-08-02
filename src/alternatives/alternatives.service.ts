import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AlternativesService {
  constructor(private prismaClient: PrismaClient) {}
  async create(createAlternativeDto: CreateAlternativeDto) {
    try {
      const { description, questionId, correct } = createAlternativeDto;

      const alternative = await this.prismaClient.alternative.create({
        data: {
          description,
          questionId,
          correct,
        },
        select: {
          id: true,
        },
      });

      return alternative;
    } catch (error) {
      throw new HttpException(
        'Não foi possível cadastrar a alternativa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaClient.alternative.findMany({
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
      return await this.prismaClient.alternative.findFirstOrThrow({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new HttpException(
        'Não foi possível buscar a alternativa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateAlternativeDto: UpdateAlternativeDto) {
    try {
      await this.prismaClient.alternative.findFirstOrThrow({
        where: { id, deletedAt: null },
      });

      const { description, questionId, correct } = updateAlternativeDto;

      const alternative = this.prismaClient.alternative.update({
        data: {
          description,
          questionId,
          correct,
        },
        where: {
          id,
        },
      });

      return alternative;
    } catch (error) {
      throw new HttpException(
        'Não foi possível editar a alternativa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaClient.alternative.findFirstOrThrow({
        where: { id, deletedAt: null },
      });

      await this.prismaClient.alternative.delete({ where: { id } });

      return { message: 'Alternativa removida com sucesso!' };
    } catch (error) {
      throw new HttpException(
        'Não foi possível remover a alternativa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
