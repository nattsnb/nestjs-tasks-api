import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
