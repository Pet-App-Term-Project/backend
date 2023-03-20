import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertSchema } from 'src/schemas/advert.schema';
import { ChatSchema } from 'src/schemas/chat.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ChatModule } from '../chat/chat.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: 'Advert', schema: AdvertSchema }]),
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
