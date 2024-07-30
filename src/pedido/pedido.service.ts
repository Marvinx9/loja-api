import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  async getPedido() {}

  async postPedido() {
    return {
      mensagem: 'pedido criado com sucesso',
    };
  }

  async pedidoById() {}

  async putPedido() {}

  async deletePedido() {}
}
