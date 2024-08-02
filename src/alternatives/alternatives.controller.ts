import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlternativesService } from './alternatives.service';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { AuthGuardAdmin } from 'src/auth/guard/adm-auth.guard';

@Controller('alternatives')
export class AlternativesController {
  constructor(private readonly alternativesService: AlternativesService) {}

  @UseGuards(AuthGuardAdmin)
  @Post()
  create(@Body() createAlternativeDto: CreateAlternativeDto) {
    return this.alternativesService.create(createAlternativeDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Get()
  findAll() {
    return this.alternativesService.findAll();
  }

  @UseGuards(AuthGuardAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alternativesService.findOne(+id);
  }

  @UseGuards(AuthGuardAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlternativeDto: UpdateAlternativeDto) {
    return this.alternativesService.update(+id, updateAlternativeDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alternativesService.remove(+id);
  }
}
