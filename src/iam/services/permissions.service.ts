import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createPermissionDto: CreatePermissionDto) {}

  async findAll() {}

  async findOne(id: string) {}

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {}

  async remove(id: string) {}
}
