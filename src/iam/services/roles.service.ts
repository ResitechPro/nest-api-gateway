import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async create(createRoleDto: CreateRoleDto) {}

  async findAll() {}

  async findOne(id: string) {}

  async update(id: string, updateRoleDto: UpdateRoleDto) {}

  async remove(id: string) {}
}
