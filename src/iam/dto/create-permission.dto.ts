export class CreatePermissionDto {
  readonly resource: string;
  readonly action: string;
  readonly id?: string;
}
