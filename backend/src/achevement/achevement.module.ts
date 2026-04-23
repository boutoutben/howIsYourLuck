import { Module } from '@nestjs/common';
import { AchevementController } from './achevement.controller';
import { AchevementService } from './achevement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achevement } from './achevement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achevement]), 
  ],
  controllers: [AchevementController],
  providers: [AchevementService]
})
export class AchevementModule {}
