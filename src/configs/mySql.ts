import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
require('dotenv').config();

export default {
  type: 'mysql',
  port: process.env.RDS_PORT || 3306,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  insecureAuth: true,
  supportBigNumbers: true,
  multipleStatements: true,
  synchronize: false, // must be false in production
  migrationsRun: true,
  entities: [path.join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..','/migration/*.ts')],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  allowJs: true,
  subscribers: ['src/subscriber/**/*.ts'],
} as TypeOrmModuleOptions;
