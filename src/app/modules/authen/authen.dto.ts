export class LoginDto {
  userName: string;
  password: string;
}
export class LoginRequestDto {
  userId: number;
  userName: string;
  password: string;
}

export class AuthenInfoDto {
  accessToken: string;
  tokenType: string;
  expired: string;
}

export class LoginResponseDto {
  auth: AuthenInfoDto;
  user: PayLoadAuthenDto;
}

export class PayLoadAuthenDto {
  userId: number;
  userName: string;
}
