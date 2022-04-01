import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import * as joi from 'joi';

export type ObjectToSchemaJoi<T> = {
  [P in keyof T]: any;
};

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: joi.ObjectSchema,
    private options: joi.ValidationOptions = {
      abortEarly: false,
      cache: true,
    },
  ) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    const result = this.schema.validate(value, this.options);
    if (result.error) {
      throw new BadRequestException(result.error.details[0].message);
    }
    return result.value;
  }
}
