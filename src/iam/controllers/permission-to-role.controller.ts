import { Body, Controller, Delete, Post } from '@nestjs/common';
import { PermissionToRoleService } from '../services/permission-to-role.service';
import { PermissionToRoleDto } from '../dto/permission-to-role.dto';

@Controller('permission_to_role')
export class PermissionToRoleController {
  constructor(
    private readonly permissionToRoleService: PermissionToRoleService,
  ) {}

  @Post()
  assignPermissionToRole(@Body() permissionToRoleDto: PermissionToRoleDto) {
    return this.permissionToRoleService.assignPermissionToRole(
      permissionToRoleDto,
    );
  }

  @Delete()
  removePermissionFromRole(@Body() permissionToRoleDto: PermissionToRoleDto) {
    return this.permissionToRoleService.removePermissionFromRole(
      permissionToRoleDto,
    );
  }
}
