import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/request/Register.dto';
import { User } from 'src/schemas/userSchema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(dto: RegisterDto): Promise<User> {
    const createUser = new this.userModel(dto);
    return createUser.save();
  }

  async GetIDByNickname(nickname: string) {
    const user = await this.userModel
      .findOne({ nickname })
      .select('_id')
      .exec();
    return user ? user._id.toString() : null;
  }


  async GetIDByEmail(email: string){
    const user = await this.userModel
      .findOne({ email })
      .select('_id')
      .exec();
    return user ? user._id.toString() : null;
  }

  async GetByNickname(nickname: string){
    const user = await this.userModel.findOne({nickname}).exec();
    return user
  }
}
