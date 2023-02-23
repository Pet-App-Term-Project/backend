import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('')
  changeInformation(
    @Body() changeUserInformationDto: ChangeUserInformationDto,
    @CurrentUser() currentUser,
  ) {
    return this.userService.changeUserInformation(
      changeUserInformationDto,
      currentUser._id,
    );
  }
}
