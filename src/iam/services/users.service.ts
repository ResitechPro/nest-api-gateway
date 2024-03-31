import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    return this.iamClient.send({ cmd: 'create_user' }, createUserDto);
  }

  async findAll() {
    return this.iamClient.send({ cmd: 'get_users' }, {});
  }

  async findOne(id: string) {
    return this.iamClient.send({ cmd: 'get_user' }, id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.iamClient.send(
      { cmd: 'update_user' },
      { id, ...updateUserDto },
    );
  }

  async remove(id: string) {
    return this.iamClient.send({ cmd: 'delete_user' }, id);
  }
}
