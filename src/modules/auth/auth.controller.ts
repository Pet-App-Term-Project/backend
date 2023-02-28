import { Body, Controller, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/register-dto.dtos';
import { LoginDto } from 'src/dtos/user-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
