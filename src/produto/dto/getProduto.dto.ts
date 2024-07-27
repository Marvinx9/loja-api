import { CaracteristicaProduto } from './caracteristicaProduto.entity.dto';
import { ImagemProduto } from './imagemProduto.entity.dto';

export class GetProdutoDto {
  constructor(
    readonly id: string,
    readonly usuario_id: string,
    readonly nome: string,
    readonly valor: number,
    readonly quantidade: number,
    readonly descricao: string,
    readonly categoria: string,
    readonly caracteristicas: CaracteristicaProduto[],
    readonly imagens: ImagemProduto[],
  ) {}
}
