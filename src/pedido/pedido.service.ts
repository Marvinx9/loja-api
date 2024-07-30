import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { GetPedidoDto } from './dto/getPedido.dto';
import { PutPedidoDto } from './dto/putPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getPedido() {
    const pedidos = await this.pedidoRepository.find();
    const pedidosLista = pedidos.map(
      (pedido) => new GetPedidoDto(pedido.id, pedido.status, pedido.valorTotal),
    );
    return pedidosLista;
  }

  async postPedido(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.valorTotal = 0;
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async pedidoById() {}

  async putPedido(id: string, dadosDoPedido: PutPedidoDto) {}

  async deletePedido() {}
}
