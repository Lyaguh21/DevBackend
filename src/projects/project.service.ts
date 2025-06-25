import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserProfileService } from 'src/userprofile/userProfile.service';

@Injectable()
export class ProjectService {
  constructor() {}

//   async auth(dto: AuthDto): Promise<LoginResponseDto> {
//     const nickname = dto.nickname.trim();

//     const user = await this.userService.GetUserByNickname(nickname);
//     if (!user) {
//       throw new ConflictException('Такого пользователя не существует');
//     }

//     const userProfile = await this.userProfileService.GetProfileByID(user._id.toString());
//     if (!userProfile) {
//       throw new ConflictException('Такого пользователя не существует');
//     }

//     const passwordExists = await this.hashService.validatePassword(
//       dto.password.trim(),
//       user.password,
//     );

//     if (!passwordExists) {
//       throw new ConflictException('Неверный логин или пароль');
//     }

//     var token = await this.authJwtService.createAuthJWT(user.id);

//     return {
//       id: user.id,
//       nickname: user.nickname,
//       role: userProfile.role,
//       JWTtoken: token.access_token,
//     };
//   }

//   public async register(dto: RegisterDto): Promise<LoginResponseDto> {
//     const email = dto.email.trim();
//     const nickname = dto.nickname.trim();
//     const fn = dto.firstName.trim();
//     const ln = dto.lastName.trim();

//     const emailExists = await this.userService.GetIDByEmail(email);
//     const nicknameExists = await this.userService.GetIDByNickname(nickname);

//     if (emailExists) {
//       throw new ConflictException('Такой email уже зарегистрирован');
//     }
//     if (nicknameExists) {
//       throw new ConflictException('Никнейм занят');
//     }

//     const newUser = await this.userService.create({
//       nickname: nickname,
//       email: email,
//       password: await this.hashService.createHashPassword(dto.password),
//     });

//     const token = await this.authJwtService.createAuthJWT(
//       newUser._id.toString(),
//     );

//     const UserProfile = await this.userProfileService.create({
//       id: newUser._id.toString(),
//       firstName: fn,
//       lastName: ln,
//       role: dto.role,
//     });

//     return {
//       id: newUser._id.toString(),
//       nickname: newUser.nickname,
//       role: UserProfile.role,
//       JWTtoken: token.access_token,
//     };
//   }
}
