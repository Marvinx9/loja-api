import { Injectable, NotFoundException } from '@nestjs/common';
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

  async buscaPorEmail(emailUsuario: string) {
    return this.usuarioRepository.findOne({
      where: { email: emailUsuario },
      select: ['email', 'senha', 'id', 'nome'],
    });
  }

  async postUsuario(dadosDoUsuario: PostUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    await this.usuarioRepository.save(usuarioEntity);
    return {
      usuario: new GetUsuarioDto(
        usuarioEntity.id,
        usuarioEntity.nome,
        usuarioEntity.email,
      ),
      mensagem: 'Usuário criado com sucesso.',
    };
  }

  async putUsuario(id: string, dadosUsuario: PutUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('Usuario não encontrado.');
    }

    Object.assign(usuario, dadosUsuario as UsuarioEntity);

    await this.usuarioRepository.save(usuario);

    return {
      usuario: usuario,
      mensagem: 'Usuário atualizado com sucesso.',
    };
  }

  async deleteUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return {
      usuario: resultado,
      mensagem: 'Usuário deletado com sucesso.',
    };
  }
}
