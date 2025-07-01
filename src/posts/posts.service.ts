import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Posts } from 'src/schemas/postsSchema';
import { CreatePostDto } from './dto/requests/CreatePost.dto';
import { GetPostDto } from './dto/response/GetPost.dto';
import { UpdatePostDto } from './dto/requests/UpdatePost.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private postsModel: Model<Posts>) {}

  async create(dto: CreatePostDto, userId: string): Promise<GetPostDto> {
    const newpost = new this.postsModel({
      ...dto,
      author: new Types.ObjectId(userId),
      likes: 0,
      likedBy: [],
    });

    await newpost.save();
    return this.GetPostByID(newpost._id.toString());
  }

  async getPostsByAuthor(authorId: string): Promise<GetPostDto[]> {
    if (!authorId || !Types.ObjectId.isValid(authorId)) {
      throw new BadRequestException('Invalid author ID format');
    }

    const posts = await this.postsModel
      .find({ author: new Types.ObjectId(authorId) })
      .lean()
      .exec();

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author.toString(),
      type: post.type,
      direction: post.direction,
      likes: post.likes,
      likesBy: post.likedBy,
      previewImage: post.previewImage,
    }));
  }

  async GetPostByID(id: string): Promise<GetPostDto> {
    const post = await this.postsModel
      .findById(new Types.ObjectId(id))
      .lean()
      .exec();
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author.toString(),
      type: post.type,
      direction: post.direction,
      likes: post.likes,
      likesBy: post.likedBy,
      previewImage: post.previewImage,
    };
  }

  async UpdatePost(id: string, dto: UpdatePostDto): Promise<GetPostDto> {
    const post = await this.postsModel
      .findByIdAndUpdate(
        id, 
        {
          title: dto.title,
          content: dto.content,
          type: dto.type,
          direction: dto.direction,
          previewImage: dto.previewImage,
        },
        { new: true },
      )
      .exec();

    if (!post) {
      throw new NotFoundException('Не удалось обновить пост');
    }

    return await this.GetPostByID(id);
  }
  async PutLike(id: string, userId: string): Promise<GetPostDto> {
    const updatedPost = await this.postsModel
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $inc: { likes: 1 },
          $push: { likedBy: new Types.ObjectId(userId) },
        },
        { new: true },
      )
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Не удалось поставить лайк');
    }

    return await this.GetPostByID(id);
  }

  async RemoveLike(id: string, userId: string): Promise<GetPostDto> {
    const updatedPost = await this.postsModel
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $inc: { likes: -1 },
          $pull: { likedBy: new Types.ObjectId(userId) },
        },
        { new: true },
      )
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Не удалось снять лайк');
    }

    return await this.GetPostByID(id);
  }

  async DeletePost(id: string) {
    const delpost = await this.postsModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
    if (!delpost) {
      throw new NotFoundException(`Пост не найден`);
    }
    return { message: 'Пост успешно удален' };
  }

  async GetAllPosts(): Promise<GetPostDto[]> {
    const posts = await this.postsModel.find().lean().exec();

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author.toString(),
      type: post.type,
      direction: post.direction,
      likes: post.likes,
      likesBy: post.likedBy,
      previewImage: post.previewImage,
    }));
  }
}
