import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { PutProdutoDto } from './dto/putProduto.dto';
import { v4 as uuid } from 'uuid';
import { PostProdutoDto } from './dto/postProduto.dto';
import { GetProdutoDto } from './dto/getProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async getProduto() {
    const produtoSalvo = await this.produtoRepository.find();
    const produtos = produtoSalvo.map(
      (produto) =>
        new GetProdutoDto(
          produto.id,
          produto.usuario_id,
          produto.nome,
          produto.valor,
          produto.quantidade,
          produto.descricao,
          produto.categoria,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtos;
  }

  async postProduto(dadosDoProduto: PostProdutoDto) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.usuario_id = dadosDoProduto.usuarioId;
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.caracteristicas = produtoEntity.caracteristicas;
    produtoEntity.imagens = produtoEntity.imagens;
    await this.produtoRepository.save(produtoEntity);

    return {
      produto: new GetProdutoDto(
        produtoEntity.id,
        produtoEntity.usuario_id,
        produtoEntity.nome,
        produtoEntity.valor,
        produtoEntity.quantidade,
        produtoEntity.descricao,
        produtoEntity.categoria,
        produtoEntity.caracteristicas,
        produtoEntity.imagens,
      ),
      mensagem: 'produto criado com sucesso',
    };
  }

  async putProduto(id: string, produtoEntity: PutProdutoDto) {
    const produtoPut = await this.produtoRepository.update(id, produtoEntity);
    return {
      produto: produtoPut,
      mensagem: 'produto atualizado com sucesso',
    };
  }

  async deleteProduto(id: string) {
    const produtoDelete = await this.produtoRepository.delete(id);
    return {
      produto: produtoDelete,
      mensagem: 'produto deletado com sucesso',
    };
  }
}
