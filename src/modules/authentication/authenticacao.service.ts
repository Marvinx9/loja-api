import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}
@Injectable()
export class AuthenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const usuarioAuthenticado = await bcrypt.compare(senha, usuario.senha);

    if (!usuarioAuthenticado) {
      throw new UnauthorizedException('email ou senha incorreto.');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
