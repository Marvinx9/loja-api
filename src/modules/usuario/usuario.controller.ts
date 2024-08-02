import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostUsuarioDto } from './dto/postUsuario.dto';
import { PutUsuarioDto } from './dto/putUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Get()
  async getUsuarios() {
    const usuariosSalvos = await this.usuarioService.getUsuarios();
    return usuariosSalvos;
  }

  @Post()
  async postUsuario(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...dadosDoUsuario }: PostUsuarioDto,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    return this.usuarioService.postUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });
  }

  @Put('/:id')
  async putUsuario(
    @Param('id') id: string,
    @Body() dadosDoUsuario: PutUsuarioDto,
  ) {
    return this.usuarioService.putUsuario(id, dadosDoUsuario);
  }

  @Delete('/:id')
  async deleteUsuario(@Param('id') id: string) {
    return this.usuarioService.deleteUsuario(id);
  }
}
