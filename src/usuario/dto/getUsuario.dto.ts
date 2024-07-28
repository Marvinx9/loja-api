export class GetUsuarioDto {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly email: string,
  ) {}
}
