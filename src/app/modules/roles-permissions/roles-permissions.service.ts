import { Injectable } from '@nestjs/common';
import { RolesPermissionsRepository } from '../../repositories/roles-permissions.repository';

@Injectable()
export class RolesPermissionService {
  constructor(private rolesPersRepository: RolesPermissionsRepository) {}
}
