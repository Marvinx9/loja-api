import { CaracteristicaProdutoEntity } from '../caracteristicaProduto.entity';
import { ImagemProdutoEntity } from '../imagemProduto.entity';

export class GetProdutoDto {
  constructor(
    readonly id: string,
    readonly usuario_id: string,
    readonly nome: string,
    readonly valor: number,
    readonly quantidade: number,
    readonly descricao: string,
    readonly categoria: string,
    readonly caracteristicas: CaracteristicaProdutoEntity[],
    readonly imagens: ImagemProdutoEntity[],
  ) {}
}
