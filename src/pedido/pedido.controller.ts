import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('/pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Get()
  async getPedidos() {
    return this.pedidoService.getPedido();
  }

  @Post()
  async postPedidos() {
    return this.pedidoService.postPedido();
  }

  @Put('/:id')
  async putPedido() {
    return this.pedidoService.putPedido();
  }

  @Delete('/:id')
  async deletePedido() {
    return this.pedidoService.deletePedido();
  }
}
