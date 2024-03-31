import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.iamClient.send(
      { cmd: 'create_permission' },
      createPermissionDto,
    );
  }

  async findAll() {
    return this.iamClient.send({ cmd: 'get_permissions' }, {});
  }

  async findOne(id: string) {
    return this.iamClient.send({ cmd: 'get_permission' }, id);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.iamClient.send(
      { cmd: 'update_permission' },
      { id, ...updatePermissionDto },
    );
  }

  async remove(id: string) {
    return this.iamClient.send({ cmd: 'delete_permission' }, id);
  }
}
