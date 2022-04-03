import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment', { name: 'user_id', unsigned: true })
  userId: number;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  userName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'lasst_name',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  address: string;

  @Column({
    name: 'age',
    type: 'int',
    unsigned: true,
    default: 0,
    nullable: true,
  })
  age: number;

  @Column({
    name: 'access_token',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    default: null,
    nullable: true,
  })
  refreshToken: string;

  @ManyToOne(() => Roles, (role) => role.roleId, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  constructor(attributes: Partial<Users> = {}) {
    Object.assign(this, attributes);
  }
}
