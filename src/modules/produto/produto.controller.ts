import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostProdutoDto } from './dto/postProduto.dto';
import { PutProdutoDto } from './dto/putProduto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}
  @Get()
  @UseInterceptors(CacheInterceptor)
  async getProdutos() {
    return this.produtoService.getProduto();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getProdutoById(@Param('id') id: string) {
    return this.produtoService.getProdutoById(id);
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
