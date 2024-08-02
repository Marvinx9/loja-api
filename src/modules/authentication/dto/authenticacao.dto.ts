import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticacaoDto {
  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  senha: string;
}
