import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { CreateUserDto } from './dto/request/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(dto);
    const savedUser = await createdUser.save();
    return savedUser.toObject();
  }

  async GetIDByNickname(nickname: string) {
    const user = await this.userModel
      .findOne({ nickname })
      .select('_id')
      .exec();
    return user ? user._id.toString() : null;
  }

  async GetIDByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).select('_id').exec();
    return user ? user._id.toString() : null;
  }

  async GetUserByNickname(nickname: string) {
    const user = await this.userModel.findOne({ nickname }).exec();
    return user;
  }

  async GetUserByID(id: string) {
    const user = await this.userModel.findById(new Types.ObjectId(id)).exec();
    if (!user) {
      throw new ConflictException('Пользователь не найден')
    }
    return user?.nickname
  }
}
