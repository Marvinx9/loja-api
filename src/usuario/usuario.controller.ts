import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetUsuarioDto } from './dto/getUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { PostUsuarioDto } from './dto/postUsuario.dto';
import { PutUsuarioDto } from './dto/putUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  @Get()
  async getUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosList = usuariosSalvos.map(
      (usuario) => new GetUsuarioDto(usuario.id, usuario.nome),
    );
    return usuariosList;
  }

  @Post()
  async postUsuario(@Body() dadosDoUsuario: PostUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new GetUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'usuário criado com sucesso',
    };
  }

  @Put('/:id')
  async putUsuario(
    @Param('id') id: string,
    @Body() dadosDoUsuario: PutUsuarioDto,
  ) {
    const usuarioPut = await this.usuarioRepository.putUsuario(
      id,
      dadosDoUsuario,
    );
    return {
      usuario: usuarioPut,
      mensagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteUsuario(@Param('id') id: string) {
    const usuarioDelete = await this.usuarioRepository.deleteUsuario(id);
    return {
      usuario: usuarioDelete,
      mensagem: 'usuário deletado com sucesso',
    };
  }
}
