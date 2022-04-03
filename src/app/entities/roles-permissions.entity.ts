import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Permissions } from './permissions.entity';
import { Roles } from './roles.entity';

@Entity('roles-permissions')
export class RolesPermissions {
  @ManyToOne(() => Roles, (role) => role.roleId, {
    primary: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @ManyToOne(() => Permissions, (permission) => permission.permissionId, {
    primary: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission: Permissions;

  constructor(attributes: Partial<RolesPermissions> = {}) {
    Object.assign(this, attributes);
  }
}
