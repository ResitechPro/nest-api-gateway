import { Inject, Injectable } from '@nestjs/common';
import { PermissionToRoleDto } from '../dto/permission-to-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PermissionToRoleService {
  constructor(@Inject('IAM_SERVICE') private readonly iamClient: ClientProxy) {}

  async assignPermissionToRole(permissionToRoleDto: PermissionToRoleDto) {
    return this.iamClient.send(
      { cmd: 'assign_permission_to_role' },
      permissionToRoleDto,
    );
  }

  async removePermissionFromRole(permissionToRoleDto: PermissionToRoleDto) {
    return this.iamClient.send(
      { cmd: 'remove_permission_from_role' },
      permissionToRoleDto,
    );
  }
}
