import { EntityRepository, Repository } from 'typeorm';
import { Permissions } from '../entities/permissions.entity';

@EntityRepository(Permissions)
export class PermissionRepository extends Repository<Permissions> {}
