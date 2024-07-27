import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsuarioDto } from './dto/getUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new GetUsuarioDto(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }
}
