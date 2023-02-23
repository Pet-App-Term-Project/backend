import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advert, AdvertSchema } from 'src/schemas/advert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Advert.name,
        schema: AdvertSchema,
      },
    ]),
  ],
  providers: [AdvertService],
  controllers: [AdvertController],
  exports: [AdvertService],
})
export class AdvertModule {}
