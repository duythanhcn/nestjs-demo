import { PermissionAction } from '../..//common/constants';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn('increment', {
    name: 'permission_id',
    unsigned: true,
  })
  permissionId: number;

  @Column({
    name: 'permission_name',
    type: 'enum',
    enum: PermissionAction,
    nullable: false,
  })
  permissionName: PermissionAction;

  constructor(attributes: Partial<Permissions> = {}) {
    Object.assign(this, attributes);
  }
}
