import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { RegisterDto } from 'src/dtos/register-dto.dtos';
import { LoginDto } from 'src/dtos/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.registerUser(registerDto);
  }
  @Patch()
  changeInformation(
    @Body() changeUserInformationDto: ChangeUserInformationDto,
  ) {
    return this.authService.changeUserInformation(changeUserInformationDto);
  }
}
