import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskDto } from './task.dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../database/prisma-error.enum';

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
      throw new NotFoundException();
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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  createTask(task: TaskDto) {
    return this.prismaService.task.create({
      data: task,
    });
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
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
