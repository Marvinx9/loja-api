import { CaracteristicaProduto } from './caracteristicaProduto.dto';
import { ImagemProduto } from './imagemProduto.dto';

export class GetProdutoDto {
  constructor(
    readonly id: string,
    readonly usuarioId: string,
    readonly nome: string,
    readonly valor: number,
    readonly quantidade: number,
    readonly descricao: string,
    readonly categoria: string,
    readonly caracteristicas: CaracteristicaProduto[],
    readonly imagens: ImagemProduto[],
  ) {}
}
