import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.UserService.create(body);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.UserService.update(Number(id), body);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(Number(id));
  }

  @Put('score/:id')
  updateSocre(@Param('id') id: string) {
    return this.UserService.updateScore(Number(id));
  }
}
