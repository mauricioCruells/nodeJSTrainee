import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../dtos/token-payload.dto';
import { UserRepository } from '../../users/repositories/user.repository';
import { RoleRepository } from 'src/roles/repositories/role.repository';
import { UserPayload } from '../dtos/user-payload.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload & UserPayload) {
    const roleId = (await this.userRepository.findOne({ _id: payload.sub }))
      .role;

    const role = (await this.roleRepository.findOne({ _id: roleId })).name;

    return { _id: payload.sub, email: payload.email, role };
  }
}
