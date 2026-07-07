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
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'boutoutben',
      password: "Cpvupvu123!",
      database: 'howisyourluck',
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // ⚠️ dev only
    }),
    AchevementModule,
    PlanningModule,
    ContactModule,
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
