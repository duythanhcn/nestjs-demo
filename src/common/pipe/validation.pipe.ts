import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';
import { validate, ValidationError } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          errors: this.formatErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map((x) => {
      return {
        errorCode: _.keys(x.constraints).pop(),
        value: x.value,
        field: x.property,
        message: _.values(x.constraints).pop(),
      };
    });
  }
}
