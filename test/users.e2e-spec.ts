import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LoginDto } from '../src/app/modules/authen/authen.dto';
import { UsersService } from '../src/app/modules/users/users.service';
import { Users } from '../src/app/entities/users.entity';
import {
  CreateUserInputDto,
  DeleteUserInputDto,
  GetUserInputDto,
  UpdateUserInputDto,
} from '../src/app/modules/users/users.dto';
import { RolesEnum } from '../src/common/constants';

describe('UserController', () => {
  let app: INestApplication;
  let usersService: any;
  let accessToken: any;
  let userId: any;
  let userIdForm: any;
  const loginReq: LoginDto = {
    userName: 'ThanhLD',
    password: '11111111',
  };
  const registerReq: CreateUserInputDto = {
    userName: 'ThanhLD101',
    password: '11111111',
    lastName: 'thanh',
    firstName: 'le',
    address: 'HCM',
    age: 20,
    role: RolesEnum.USER,
  };

  const registerFormReq: CreateUserInputDto = {
    userName: 'ThanhLD102',
    password: '11111111',
    lastName: 'thanh',
    firstName: 'le',
    address: 'HCM',
    age: 20,
    role: RolesEnum.USER,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    usersService = moduleFixture.get<UsersService>(UsersService);
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginReq);
    accessToken = response.body.data.auth.accessToken;
  });

  describe('add user', () => {
    it('success', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Bearer ' + accessToken)
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
  //
  describe('/form', () => {
    it('success', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/form')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(registerFormReq);

      expect(response.status).toBe(201);
      const dataForm: Users = await usersService.getUserByName(
        registerFormReq.userName,
      );
      expect(registerFormReq).toMatchObject({
        userName: dataForm.userName,
        password: dataForm.password,
        lastName: dataForm.lastName,
        firstName: dataForm.firstName,
        address: dataForm.address,
        age: dataForm.age,
      });
      userIdForm = dataForm.userId;
    });
  });
  // //
  describe('update', () => {
    it('success', async () => {
      const updateData: UpdateUserInputDto = {
        userId: userIdForm,
        age: 100,
      };
      const response = await request(app.getHttpServer())
        .put('/users')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(updateData);
      expect(response.status).toBe(200);
      const data: Users = await usersService.getUserByName(
        registerFormReq.userName,
      );
      expect(data.age).toBe(updateData.age);
    });
  });
  // // //
  describe('get', () => {
    it('success', async () => {
      const getData: GetUserInputDto = {
        userName: '',
        page: 1,
        numRecords: 10,
      };
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(getData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        statusCode: 200,
        data: {
          data: [],
          pager: {},
        },
        message: 'Success',
        error: null,
      });
    });
  });
  //
  describe('delete', () => {
    it('success', async () => {
      const deleteData: DeleteUserInputDto = {
        userId: userIdForm,
      };
      const response = await request(app.getHttpServer())
        .delete('/users')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(deleteData);

      expect(response.status).toBe(201);
    });
  });
  //
  afterAll(async () => {
    await usersService.deleteUser({ userId });
  });
});
