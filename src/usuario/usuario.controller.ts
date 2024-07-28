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

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Get()
  async getUsuarios() {
    const usuariosSalvos = await this.usuarioService.getUsuarios();
    return usuariosSalvos;
  }

  @Post()
  async postUsuario(@Body() dadosDoUsuario: PostUsuarioDto) {
    return this.usuarioService.postUsuario(dadosDoUsuario);
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
