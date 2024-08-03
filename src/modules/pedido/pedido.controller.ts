import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PostPedidoDto } from './dto/postPedido.dto';
import { PutPedidoDto } from './dto/putPedido.dto';
import {
  AuthenticationGuard,
  RequisicaoComUsuario,
} from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  async getPedidos(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.getPedidoUsuario(usuarioId);
  }

  @Post()
  async postPedidos(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: PostPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;

    return this.pedidoService.postPedido(usuarioId, dadosDoPedido);
  }

  @Patch('/:id')
  async putPedido(
    @Param('id') id: string,
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: PutPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;

    return this.pedidoService.putPedido(id, usuarioId, dadosDoPedido);
  }

  @Delete('/:id')
  async deletePedido(@Param('id') id: string) {
    return this.pedidoService.deletePedido(id);
  }
}
