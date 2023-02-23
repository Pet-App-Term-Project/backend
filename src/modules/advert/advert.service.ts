import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdvertDto } from 'src/dtos/create-advert.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { Advert, AdvertDocument } from 'src/schemas/advert.schema';

@Injectable()
export class AdvertService {
  constructor(
    @InjectModel(Advert.name)
    private readonly advertModel: Model<AdvertDocument>,
  ) {}

  async createAdvert(userId: ObjectId, createAdvertDto: CreateAdvertDto) {
    const advert = new this.advertModel({
      ...createAdvertDto,
      user: userId,
    });
    return advert.save();
  }

  async deleteAdvert(userId: ObjectId, advertId: ObjectId) {
    const advert = await this.advertModel
      .findOne({
        _id: advertId,
      })
      .lean();
    if (!advert) {
      throw new Error('Advert not found');
    }
    if (advert.user.toString() !== userId.toString()) {
      throw new Error('You are not the owner of this advert');
    }
    await this.advertModel.deleteOne({
      _id: advertId,
    });
    return {
      message: 'Advert deleted',
    };
  }
}
