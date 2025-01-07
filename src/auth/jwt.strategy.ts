import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'y$2y$10$5MhFjtB3pmwBiDKycaTFVOLASpeRFyA9zXiZsgfkDsNN2JbG4FE0y', // Ganti dengan secret key Anda
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
