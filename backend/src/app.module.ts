import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchevementController } from './achevement/achevement.controller';
import { AchevementModule } from './achevement/achevement.module';
import { PlanningController } from './planning/planning.controller';
import { PlanningService } from './planning/planning.service';
import { PlanningModule } from './planning/planning.module';
import { BaseCrudService } from './common/base-crud/base-crud.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "Cpvupvu123!",
      database: 'how_is_your_luck',
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // ⚠️ dev only
    }),
    AchevementModule,
    PlanningModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
