import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticacaoService {
  constructor(private usuarioService: UsuarioService) {}
  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    const usuarioAuthenticado = await bcrypt.compare(senha, usuario.senha);

    if (!usuarioAuthenticado) {
      throw new UnauthorizedException('email ou senha incorreto.');
    }
    console.log('Login bem sucedido');
  }
}
