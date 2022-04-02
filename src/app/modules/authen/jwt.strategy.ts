import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    /// check user exist and still valid access token
    // case save access token in DB without redis
    const user = await this.usersService.getUserById(payload.userId);
    const accessToken: string = req.headers?.['authorization'].split(' ')[1];

    if (!user || user.accessToken !== accessToken) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
