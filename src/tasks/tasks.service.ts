import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskDto } from './task.dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../database/prisma-error.enum';
import { TaskNotFoundException } from './task-not-found-exception';
import { TitleNotUniqueException } from './title-not-unique-exception';

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

  async upDateTask(id: number, task: TaskDto) {
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

  createTask(task: TaskDto) {
    try {
      return this.prismaService.task.create({
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
}
