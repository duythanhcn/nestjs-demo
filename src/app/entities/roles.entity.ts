import { RolesEnum } from '../..//common/constants';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('increment', {
    name: 'role_id',
    unsigned: true,
  })
  roleId: number;

  @Column({
    name: 'role_name',
    type: 'enum',
    enum: RolesEnum,
    nullable: false,
  })
  roleName: RolesEnum;

  constructor(attributes: Partial<Roles> = {}) {
    Object.assign(this, attributes);
  }
}
