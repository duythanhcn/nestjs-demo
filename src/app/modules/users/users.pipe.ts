import { ArgumentMetadata } from '@nestjs/common';
import * as Joi from 'joi';
import { RolesEnum } from '../../../common/constants';
import { JoiValidationPipe } from '../../../common/pipe/joiValidation.pipe';
import {
  CreateUserInputDto,
  GetUserInputDto,
  RegisterInputDto,
  UpdateUserInputDto,
} from './users.dto';

// validation for create user
export class CreateUsersPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<CreateUserInputDto>({
        userName: Joi.string().required(),
        password: Joi.string().required(),
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        address: Joi.string().required(),
        age: Joi.number().required().min(1),
        role: Joi.string()
          .required()
          .valid(...Object.values(RolesEnum)),
      }),
    );
  }

  transform(value: CreateUserInputDto, _metadata: ArgumentMetadata) {
    const validatedValue: CreateUserInputDto = super.transform(
      value,
      _metadata,
    );
    return validatedValue;
  }
}

// validation for update user
export class UpdateUsersPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<UpdateUserInputDto>({
        userId: Joi.number().required(),
        password: Joi.string(),
        lastName: Joi.string(),
        firstName: Joi.string(),
        address: Joi.string(),
        age: Joi.number().min(1),
        role: Joi.string().valid(...Object.values(RolesEnum)),
      }),
    );
  }

  transform(value: UpdateUserInputDto, _metadata: ArgumentMetadata) {
    const validatedValue: UpdateUserInputDto = super.transform(
      value,
      _metadata,
    );
    return validatedValue;
  }
}

// validation for delete user
export class DeleteUsersPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<UpdateUserInputDto>({
        userId: Joi.number().required(),
      }),
    );
  }

  transform(value: UpdateUserInputDto, _metadata: ArgumentMetadata) {
    const validatedValue: UpdateUserInputDto = super.transform(
      value,
      _metadata,
    );
    return validatedValue;
  }
}

// validation for get user
export class GetUsersPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<GetUserInputDto>({
        page: Joi.number().required().default(1),
        numRecords: Joi.number().required().default(10),
        userName: Joi.string().default(''),
      }),
    );
  }

  transform(value: GetUserInputDto, _metadata: ArgumentMetadata) {
    const validatedValue: GetUserInputDto = super.transform(value, _metadata);
    return validatedValue;
  }
}

export class RegisterPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object<RegisterInputDto>({
        userName: Joi.string().required(),
        password: Joi.string().required(),
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        address: Joi.string().required(),
        age: Joi.number().required().min(1),
      }),
    );
  }

  transform(value: RegisterInputDto, _metadata: ArgumentMetadata) {
    const validatedValue: RegisterInputDto = super.transform(value, _metadata);
    return validatedValue;
  }
}
