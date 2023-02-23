import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/decorators/current-user';
import { CreateAdvertDto } from 'src/dtos/create-advert.dto';
import { ObjectId, ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
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

  @Delete('delete/:advertId')
  deleteAdvert(
    @Param('advertId', new ParseObjectIdPipe()) advertId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.advertService.deleteAdvert(currentUser._id, advertId);
  }
}
