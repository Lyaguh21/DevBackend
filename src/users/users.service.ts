import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { User } from 'src/schemas/userSchema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(dto: RegisterDto): Promise<User> {
    const createUser = new this.userModel(dto);
    return createUser.save();
  }

  nicknameExists(nickname: string) {
    return this.userModel.exists({
      where: {
        nickname: nickname,
      },
    });
  }
  emailExists(email: string){
    return this.userModel.exists({
      where: {
        email: email,
      },
    });
  }
}
