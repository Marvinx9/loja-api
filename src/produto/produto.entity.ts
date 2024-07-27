import { CaracteristicaProduto } from './dto/caracteristicaProduto.dto';
import { ImagemProduto } from './dto/imagemProduto.dto';

export class ProdutoEntity {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: CaracteristicaProduto[];
  imagens: ImagemProduto[];
}
