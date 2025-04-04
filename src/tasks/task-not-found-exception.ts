import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundException extends NotFoundException {
  constructor(taskId: number) {
    super(`Article with id ${taskId} not found`);
  }
}
