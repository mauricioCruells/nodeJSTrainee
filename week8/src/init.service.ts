import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class InitService implements OnApplicationBootstrap {
  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap() {
    await this.authService.createAdminUser();
  }
}
