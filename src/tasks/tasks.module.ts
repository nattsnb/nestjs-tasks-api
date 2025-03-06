import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
