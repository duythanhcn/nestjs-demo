import { SetMetadata } from '@nestjs/common';
import { PermissionAction } from '../../../common/constants';

export const REQUIRED_PERMISSION = Symbol('REQUIRED_PERMISSION');

export const RequiresPermission = (actions: PermissionAction) =>
  SetMetadata(REQUIRED_PERMISSION, actions);
