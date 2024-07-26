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
          produto.nome,
          produto.preco,
          produto.quantidade,
        ),
    );
    return produtoList;
  }

  @Post()
  async postProduto(@Body() dadosDoProduto: PostProdutoDto) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.preco = dadosDoProduto.preco;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    this.produtoRepository.salvar(produtoEntity);
    return {
      produto: new GetProdutoDto(
        produtoEntity.id,
        produtoEntity.nome,
        produtoEntity.preco,
        produtoEntity.quantidade,
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
