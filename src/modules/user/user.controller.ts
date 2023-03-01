import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';
import { Console } from 'console';
import { CurrentUser } from 'src/decorators/current-user';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { SetNotificationTokenDto } from 'src/dtos/notification-token.dto';
import { UpdateUserPasswordDto } from 'src/dtos/update-user-password.dto';
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
  @Put('changePassword')
  updateUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @CurrentUser() currentUser,
  ) {
    return this.userService.updateUserPassword(
      updateUserPasswordDto,
      currentUser._id,
    );
  }
  @Put('notification-token')
  setNotificationToken(
    @CurrentUser() currentUser,
    @Body() setNotificationTokenDto: SetNotificationTokenDto,
  ) {
    console.log(setNotificationTokenDto);
    return this.userService.setNotificationToken(
      currentUser._id,
      setNotificationTokenDto.notificationToken,
    );
  }
}
