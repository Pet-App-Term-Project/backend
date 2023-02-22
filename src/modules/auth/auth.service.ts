import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dtos/register-dto.dtos';
import * as bcrypt from 'bcrypt';
export interface AuthResault {
  user: Record<string, any>;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;
    const user = await this.userModel.findOne({ email }).lean();
    if (user) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    await newUser.save();

    const payload = {
      email,
      lastName,
      firstName,
      _id: newUser._id,
    };

    const token = this.jwtService.sign(payload);

    return { user: newUser, accessToken: token };
  }
  login() {
    return 'login';
  }
}
