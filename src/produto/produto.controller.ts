import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostProdutoDto } from './dto/postProduto.dto';
import { PutProdutoDto } from './dto/putProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}
  @Get()
  async getProdutos() {
    return this.produtoService.getProduto();
  }

  @Post()
  async postProduto(@Body() dadosDoProduto: PostProdutoDto) {
    return this.produtoService.postProduto(dadosDoProduto);
  }

  @Put('/:id')
  async putProduto(
    @Param('id') id: string,
    @Body() dadosDoProduto: PutProdutoDto,
  ) {
    return this.produtoService.putProduto(id, dadosDoProduto);
  }

  @Delete('/:id')
  async deleteProduto(@Param('id') id: string) {
    return this.produtoService.deleteProduto(id);
  }
}
