import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './planning.entity';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';

@Module({
     imports: [
        TypeOrmModule.forFeature([Planning]), 
      ],
      controllers: [PlanningController],
      providers: [PlanningService]
})
export class PlanningModule {}
