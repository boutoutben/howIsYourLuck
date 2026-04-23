import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchevementController } from './achevement/achevement.controller';
import { AchevementModule } from './achevement/achevement.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
