import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.iamClient.send({ cmd: 'create_role' }, createRoleDto);
  }

  async findAll() {
    return this.iamClient.send({ cmd: 'get_roles' }, {});
  }

  async findOne(id: string) {
    return this.iamClient.send({ cmd: 'get_role' }, id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.iamClient.send(
      { cmd: 'update_role' },
      { id, ...updateRoleDto },
    );
  }

  async remove(id: string) {
    return this.iamClient.send({ cmd: 'delete_role' }, id);
  }
}
