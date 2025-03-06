import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  create(@Body() task: TaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(':id')
  upDate(@Param('id', ParseIntPipe) id: number, @Body() task: TaskDto) {
    return this.tasksService.upDateTask(id, task);
  }
}
