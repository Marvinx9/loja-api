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
import { PutPedidoDto } from './dto/putPedido.dto';

@Controller('/pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Get()
  async getPedidos() {
    return this.pedidoService.getPedido();
  }

  @Post()
  async postPedidos(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.postPedido(usuarioId);
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
