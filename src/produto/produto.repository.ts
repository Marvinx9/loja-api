import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listar() {
    return this.produtos;
  }

  private findProdutoById(id: string) {
    const possivelProduto = this.produtos.find(
      (produtoSalvo) => produtoSalvo.id === id,
    );

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }
    return possivelProduto;
  }

  async putProduto(id: string, dadosDoProduto: Partial<ProdutoEntity>) {
    const produto = this.findProdutoById(id);

    Object.entries(dadosDoProduto).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      produto[chave] = valor;
    });

    return produto;
  }

  async deleteProduto(id: string) {
    const produto = this.findProdutoById(id);
    this.produtos = this.produtos.filter(
      (produtoSalvo) => produtoSalvo.id !== id,
    );
    return produto;
  }
}
