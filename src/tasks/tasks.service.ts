import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskDto } from './dto/task.dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../database/prisma-error.enum';
import { TaskNotFoundException } from './task-not-found-exception';
import { TitleNotUniqueException } from './title-not-unique-exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { NoTasksToDeleteException } from './no-tasks-to-delete-exception';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllTasks() {
    return this.prismaService.task.findMany();
  }

  async getTaskById(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  async updateTask(id: number, task: TaskDto) {
    try {
      return await this.prismaService.task.update({
        data: {
          ...task,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;

      if (prismaError.code === PrismaError.RecordDoesNotExist) {
        throw new TaskNotFoundException(id);
      }
      if (prismaError.code === PrismaError.UniqueConstraintViolated) {
        throw new TitleNotUniqueException(task.title);
      }
      throw error;
    }
  }

  async createTask(task: CreateTaskDto) {
    try {
      return await this.prismaService.task.create({
        data: task,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.UniqueConstraintViolated
      ) {
        throw new TitleNotUniqueException(task.title);
      }

      throw error;
    }
  }

  async deleteTask(id: number) {
    try {
      return await this.prismaService.task.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new TaskNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteAllTasks() {
    try {
      const allTasks = await this.getAllTasks();
      const allArticlesIds: number[] = allTasks.map((task) => task.id);
      return await this.prismaService.task.deleteMany({
        where: {
          id: {
            in: allArticlesIds,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NoTasksToDeleteException();
      }
      throw error;
    }
  }
}
