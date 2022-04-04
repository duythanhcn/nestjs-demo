import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDto } from '../src/app/modules/authen/authen.dto';
import { UsersService } from '../src/app/modules/users/users.service';
import { Users } from '../src/app/entities/users.entity';
import { RegisterInputDto } from '../src/app/modules/users/users.dto';

describe('AuthenController', () => {
  let app: INestApplication;
  let usersService: any;
  let accessToken: any;
  let userId: any;
  const registerReq: RegisterInputDto = {
    userName: 'ThanhLD100',
    password: '11111111',
    lastName: 'thanh',
    firstName: 'le',
    address: 'HCM',
    age: 20,
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    usersService = moduleFixture.get<UsersService>(UsersService);
  });

  describe('/auth/login', () => {
    it('success', async () => {
      const loginReq: LoginDto = {
        userName: 'ThanhLD',
        password: '11111111',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginReq);
      expect(response.status).toBe(201);
      const data: Users = await usersService.getUserByName(loginReq.userName);
      expect(response.body).toMatchObject({
        statusCode: 200,
        data: {
          user: { userId: data.userId, userName: data.userName },
          auth: {
            accessToken: data.accessToken,
            tokenType: 'Bearer',
          },
        },
        message: 'Success',
        error: null,
      });
      accessToken = data.accessToken;
    });

    it('missing userName', async () => {
      const loginReq = {
        password: '11111111',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginReq);
      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('missing pasword', async () => {
      const loginReq = {
        userName: 'ThanhLD',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginReq);
      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('wrong account', async () => {
      const loginReq: LoginDto = {
        userName: 'ThanhLD',
        password: 'wrongpass',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginReq);
      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
    // end
  });

  describe('auth/register', () => {
    it('success', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerReq);
      expect(response.status).toBe(201);
      const data: Users = await usersService.getUserByName(
        registerReq.userName,
      );
      expect(registerReq).toMatchObject({
        userName: data.userName,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
        address: data.address,
        age: data.age,
      });
      userId = data.userId;
    });
  });

  describe('auth/logout', () => {
    it('success', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + accessToken);
      expect(response.status).toBe(201);
    });
  });
  //
  afterAll(async () => {
    await usersService.deleteUser({ userId });
  });
});
