import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  constructor(attributes: Partial<Users> = {}) {
    Object.assign(this, attributes);
  }
}
