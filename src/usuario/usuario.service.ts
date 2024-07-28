import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsuarioDto } from './dto/getUsuario.dto';
import { PutUsuarioDto } from './dto/putUsuario.dto';
import { PostUsuarioDto } from './dto/postUsuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new GetUsuarioDto(usuario.id, usuario.nome, usuario.email),
    );

    return usuariosLista;
  }

  async existeComEmail(email: string) {
    const usuarios = await this.getUsuarios();
    const possivelUsuario = usuarios.find((usuario) => usuario.email === email);

    return possivelUsuario !== undefined;
  }

  async postUsuario(dadosDoUsuario: PostUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;

    await this.usuarioRepository.save(usuarioEntity);
    return {
      usuario: new GetUsuarioDto(
        usuarioEntity.id,
        usuarioEntity.nome,
        usuarioEntity.email,
      ),
      mensagem: 'usuário criado com sucesso',
    };
  }

  async putUsuario(id: string, usuarioEntity: PutUsuarioDto) {
    const usuarioPut = await this.usuarioRepository.update(id, usuarioEntity);
    return {
      usuario: usuarioPut,
      mensagem: 'usuário atualizado com sucesso',
    };
  }

  async deleteUsuario(id: string) {
    const usuarioDelete = await this.usuarioRepository.delete(id);
    return {
      usuario: usuarioDelete,
      mensagem: 'usuário deletado com sucesso',
    };
  }
}
