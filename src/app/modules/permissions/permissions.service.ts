import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../../repositories/permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(private persRepository: PermissionRepository) {}
}
