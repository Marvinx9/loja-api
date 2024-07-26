import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class PutUsuarioDto {
  @IsString()
  @IsOptional({ message: 'Nome não pode ser vazio' })
  nome?: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  @IsOptional()
  email?: string;

  @MinLength(6, { message: 'Senha precisa ter pelo menos 6 caracteres' })
  @IsOptional()
  senha?: string;
}
