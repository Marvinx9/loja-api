import { Injectable, NotFoundException } from '@nestjs/common';
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

    Object.assign(produtoEntity, dadosDoProduto as ProdutoEntity);
    await this.produtoRepository.save(produtoEntity);

    return {
      produto: new GetProdutoDto(
        produtoEntity.id,
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

  async produtoById(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });
    return produto;
  }

  async putProduto(id: string, produtoEntity: PutProdutoDto) {
    const produtoPut = await this.produtoById(id);

    if (produtoPut === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(produtoPut, produtoEntity as ProdutoEntity);
    await this.produtoRepository.save(produtoPut);
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
