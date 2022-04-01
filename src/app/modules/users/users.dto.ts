export class UsersData {
  userId: number;
  userName: string;
}
export class CreateUserInputDto {
  userName: string;
  password: string;
}

export class UpdateUserInputDto {
  userId: number;
  password: string;
}

export class DeleteUserInputDto {
  userId: number;
}

export class GetUserInputDto {
  userName: string;
  page: number;
  numRecords: number;
}
