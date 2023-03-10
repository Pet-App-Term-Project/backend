import { FirebaseMessagingService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdvertDto } from 'src/dtos/create-advert.dto';
import { UpdateAdvertDto } from 'src/dtos/update-advert.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { Advert, AdvertDocument } from 'src/schemas/advert.schema';

@Injectable()
export class AdvertService {
  constructor(
    @InjectModel(Advert.name)
    private readonly advertModel: Model<AdvertDocument>,
    private readonly firebaseMessaging: FirebaseMessagingService,
  ) {}

  //   this.firebaseMessaging.send({
  //     notification: {
  //         title: ${currentUser.firstName} ${currentUser.lastName} istek gönderdi
  //         // body: 'Hemen merhaba demek ister misin?'
  //     },
  //     android: {
  //         notification: {
  //             defaultSound: true
  //         }
  //     },
  //     data : {
  //         type: 'Requests'
  //     },
  //     apns: {
  //         payload: {
  //             aps: {
  //                 sound: 'default'
  //             }
  //         }
  //     },
  //     token: recipient.notificationToken
  // })

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

  async updateAdvert(
    userId: ObjectId,
    advertId: ObjectId,
    updateAdvertDto: UpdateAdvertDto,
  ) {
    const advert = await this.advertModel
      .findOneAndUpdate(
        {
          _id: advertId,
          owner: userId,
        },
        updateAdvertDto,
        { new: true },
      )
      .lean();

    if (!advert) {
      throw new Error('Advert not found');
    }
    if (advert.user.toString() !== userId.toString()) {
      throw new Error('You are not the owner of this advert');
    }
    return advert;
  }

  getAllAdverts() {
    return this.advertModel
      .find()
      .populate('user', 'firstName lastName photoURL')
      .sort({ createdAt: -1 });
  }

  getUsersAllAdverts(userId: ObjectId) {
    return this.advertModel
      .find({
        user: userId,
      })
      .populate('user', 'firstName lastName photoURL')
      .sort({ createdAt: -1 })
      .lean();
  }
}
