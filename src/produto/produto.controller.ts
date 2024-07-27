import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetProdutoDto } from './dto/getProduto.dto';
import { v4 as uuid } from 'uuid';
import { ProdutoRepository } from './produto.repository';
import { PostProdutoDto } from './dto/postProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { PutProdutoDto } from './dto/putProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Get()
  async getProdutos() {
    const produtosSalvos = await this.produtoRepository.listar();
    const produtoList = produtosSalvos.map(
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
    return produtoList;
  }

  @Post()
  async postProduto(@Body() dadosDoProduto: PostProdutoDto) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.usuario_id = dadosDoProduto.usuarioId;
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.imagens = dadosDoProduto.imagens;
    this.produtoRepository.salvar(produtoEntity);
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

  @Put('/:id')
  async putProduto(
    @Param('id') id: string,
    @Body() dadosDoProduto: PutProdutoDto,
  ) {
    const produtoPut = await this.produtoRepository.putProduto(
      id,
      dadosDoProduto,
    );
    return {
      produto: produtoPut,
      mensagem: 'produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteProduto(@Param('id') id: string) {
    const produtoDelete = await this.produtoRepository.deleteProduto(id);
    return {
      produto: produtoDelete,
      mensagem: 'produto deletado com sucesso',
    };
  }
}
