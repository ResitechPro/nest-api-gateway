import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      const response = await this.authService.register(registerDto);
      const { status, data } = response;
      const { jwt, ...restData } = data;

      this.setCookies(res, jwt);

      res.status(status).json(restData);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const response = await this.authService.login(loginDto);
      const { status, data } = response;
      const { jwt, ...restData } = data;

      this.setCookies(res, jwt);

      res.status(status).json(restData);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.cookies;
    try {
      const response = await this.authService.logout(refresh_token);
      const { status, data } = response;

      this.clearCookies(res);

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.cookies;
    try {
      const response = await this.authService.refreshToken(refresh_token);
      const { status, data } = response;
      const { jwt, ...restData } = data;

      this.setCookies(res, jwt);

      res.status(status).json(restData);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  private setCookies(res: Response, jwt: any) {
    const { accessToken, refreshToken } = jwt;

    if (accessToken) {
      res.cookie('access_token', accessToken, { httpOnly: true });
    }

    if (refreshToken) {
      res.cookie('refresh_token', refreshToken, { httpOnly: true });
    }
  }

  private clearCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
