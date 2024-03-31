import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    this.iamClient.emit('create_user', createUserDto);
  }

  async findAll() {
    try {
      return this.iamClient.send({ cmd: 'get_users' }, {});
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    return this.iamClient.send({ cmd: 'get_user' }, { id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.iamClient.emit('update_user', { id, ...updateUserDto });
  }

  async remove(id: string) {
    this.iamClient.emit('delete_user', { id });
  }
}
