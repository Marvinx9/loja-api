import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PostPedidoDto } from './dto/postPedido.dto';
import { PutPedidoDto } from './dto/putPedido.dto';

@Controller('/pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Get()
  async getPedidos(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.getPedidoUsuario(usuarioId);
  }

  @Post()
  async postPedidos(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: PostPedidoDto,
  ) {
    return this.pedidoService.postPedido(usuarioId, dadosDoPedido);
  }

  @Put('/:id')
  async putPedido(
    @Param('id') id: string,
    @Body() dadosDoPedido: PutPedidoDto,
  ) {
    return this.pedidoService.putPedido(id, dadosDoPedido);
  }

  @Delete('/:id')
  async deletePedido() {
    return this.pedidoService.deletePedido();
  }
}
