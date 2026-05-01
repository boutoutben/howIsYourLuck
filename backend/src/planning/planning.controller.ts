import { Controller, Get, Post, Body, Delete, Param, NotFoundException, Put } from '@nestjs/common';
import { PlanningService } from './planning.service';

@Controller('planning')
export class PlanningController {
  constructor(
    private readonly PlanningService: PlanningService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.PlanningService.create(body);
  }

  @Get()
  findAll() {
    return this.PlanningService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.PlanningService.update(Number(id), body);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PlanningService.remove(Number(id));
  }

  @Put("check/:id")
  check(@Param('id') id: string) {
    return this.PlanningService.check(Number(id));
  }
}