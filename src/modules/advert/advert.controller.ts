import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { CreateAdvertDto } from 'src/dtos/create-advert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdvertService } from './advert.service';

@UseGuards(JwtAuthGuard)
@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post('create')
  createAdvert(
    @CurrentUser() currentUser,
    @Body() createAdvertDto: CreateAdvertDto,
  ) {
    console.log(currentUser);
    return this.advertService.createAdvert(currentUser._id, createAdvertDto);
  }
}
