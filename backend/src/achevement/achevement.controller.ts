import { Controller, Get, Post, Body, Delete, Param, NotFoundException, Put } from '@nestjs/common';
import { AchevementService } from './achevement.service';

@Controller('achevement')
export class AchevementController {
  constructor(
    private readonly achevementService: AchevementService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.achevementService.create(body);
  }

  @Get()
  findAll() {
    return this.achevementService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.achevementService.update(Number(id), body);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achevementService.remove(Number(id));
  }
}