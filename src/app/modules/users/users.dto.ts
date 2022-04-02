export class UsersData {
  userId: number;
  userName: string;
  lastName: string;
  firstName: string;
  address: string;
  age: number;
}
export class CreateUserInputDto {
  userName: string;
  password: string;
  lastName: string;
  firstName: string;
  address: string;
  age: number;
}

export class UpdateUserInputDto {
  userId: number;
  password?: string;
  lastName?: string;
  firstName?: string;
  address?: string;
  age?: number;
}

export class DeleteUserInputDto {
  userId: number;
}

export class GetUserInputDto {
  userName: string;
  page: number;
  numRecords: number;
}

export class UserLogin {
  userId: number;
  userName: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}

export class Pager {
  numRecords: number;
  totalCount: number;
  totalPage: number;
  currentPage: number;
  isNextPage: boolean;
  isPrevPage: boolean;
}
export class UserDataResponse {
  data: UsersData[];
  pager: Pager;
}
