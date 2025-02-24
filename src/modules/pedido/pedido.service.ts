import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { PostPedidoDto } from './dto/postPedido.dto';
import { ItemPedidoEntity } from './itemPedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { PutPedidoDto } from './dto/putPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async getPedidoUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuario não foi encontrado');
    }
    return usuario;
  }

  private async trataDadosDoPedido(
    dadosDoPedido: PostPedidoDto,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidade) {
        throw new BadRequestException(
          `Quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidade}) para o produto ${produtoRelacionado.nome}`,
        );
      }
    });
  }

  async postPedido(usuarioId: string, dadosDoPedido: PostPedidoDto) {
    const usuario = await this.buscaUsuario(usuarioId);

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    await this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntity = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidade -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntity.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntity;

    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async putPedido(id: string, usuarioId: string, putPedidoDto: PutPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }

    const pedidoUsuario = await this.pedidoRepository.find({
      where: {
        id: id,
        usuario: {
          id: usuarioId,
        },
      },
      relations: ['usuario'],
    });

    if (!pedidoUsuario.length) {
      throw new UnauthorizedException(
        'Usuario sem permisão para atualizar pedido',
      );
    }
    const usuario = await this.buscaUsuario(usuarioId);

    if (putPedidoDto.itensPedido) {
      const produtosIds = putPedidoDto.itensPedido.map(
        (itemPedido) => itemPedido.produtoId,
      );
      const produtosRelacionados = await this.produtoRepository.findBy({
        id: In(produtosIds),
      });

      const pedidoEntity = new PedidoEntity();
      pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
      pedidoEntity.usuario = usuario;
      await this.trataDadosDoPedido(putPedidoDto, produtosRelacionados);

      const itensPedidoEntity = putPedidoDto.itensPedido.map((itemPedido) => {
        const produtoRelacionado = produtosRelacionados.find(
          (produto) => produto.id === itemPedido.produtoId,
        );

        const itemPedidoEntity = new ItemPedidoEntity();

        itemPedidoEntity.produto = produtoRelacionado!;
        itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
        itemPedidoEntity.quantidade = itemPedido.quantidade;
        itemPedidoEntity.produto.quantidade -= itemPedido.quantidade;
        return itemPedidoEntity;
      });

      const valorTotal = itensPedidoEntity.reduce((total, item) => {
        return total + item.precoVenda * item.quantidade;
      }, 0);

      pedidoEntity.itensPedido = itensPedidoEntity;
      pedidoEntity.valorTotal = valorTotal;

      Object.assign(pedido, pedidoEntity as PedidoEntity);

      const pedidoUpdate = await this.pedidoRepository.save(pedido);
      return {
        produto: pedidoUpdate,
        mensagem: 'Pedido atualizado com sucesso',
      };
    }
  }

  async deletePedido(id: string) {
    const resultado = await this.pedidoRepository.delete({ id });

    if (!resultado.affected) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return {
      usuario: resultado,
      mensagem: 'Pedido deletado com sucesso.',
    };
  }
}
