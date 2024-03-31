export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly roleId: string;
  readonly id?: string;
}
