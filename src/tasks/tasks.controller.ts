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
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  @Delete('all')
  deleteAll() {
    return this.tasksService.deleteAllTasks();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(id, task);
  }
}
