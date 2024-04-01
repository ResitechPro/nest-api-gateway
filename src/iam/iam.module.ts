import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PermissionToRoleController } from './controllers/permission-to-role.controller';
import { PermissionToRoleService } from './services/permission-to-role.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'IAM_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('IAM_HOST'), // iam
            port: configService.get('IAM_PORT'), // 3001
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
    UsersController,
    RolesController,
    PermissionsController,
    PermissionToRoleController,
  ],
  providers: [
    UsersService,
    RolesService,
    PermissionsService,
    PermissionToRoleService,
  ],
})
export class IamModule {}
