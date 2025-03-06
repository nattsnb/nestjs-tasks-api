import { NotFoundException } from '@nestjs/common';

export class NoTasksToDeleteException extends NotFoundException {
  constructor() {
    super('No articles to delete.');
  }
}
