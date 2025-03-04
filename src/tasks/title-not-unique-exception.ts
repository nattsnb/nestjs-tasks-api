import { NotFoundException } from '@nestjs/common';

export class TitleNotUniqueException extends NotFoundException {
  constructor(title: string) {
    super(`Title ${title} is already in use.`);
  }
}
