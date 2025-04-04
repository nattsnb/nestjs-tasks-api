import { ConflictException } from '@nestjs/common';

export class TitleNotUniqueException extends ConflictException {
  constructor(title: string) {
    super(`Title ${title} is already in use.`);
  }
}
