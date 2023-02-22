import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/register-dto.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.registerUser(registerDto);
  }
}
