import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly authApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authApiUrl = `${this.configService.get('AUTH_PROTOCOL')}://${this.configService.get('AUTH_HOST')}:${this.configService.get('AUTH_PORT')}/api/auth`;
  }

  async register(registerDto: RegisterDto) {
    return this.sendPostRequest('register', registerDto);
  }

  async login(loginDto: LoginDto) {
    return this.sendPostRequest('login', loginDto);
  }

  async logout(refreshToken: string) {
    return this.sendPostRequest('logout', { refreshToken });
  }

  async refreshToken(refreshToken: string) {
    return this.sendPostRequest('refresh-token', { refreshToken });
  }

  private buildUrl(path: string): string {
    return `${this.authApiUrl}/${path}`;
  }

  private async sendPostRequest(path: string, data: Object) {
    return lastValueFrom(this.httpService.post(this.buildUrl(path), data));
  }
}
