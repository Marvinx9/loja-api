import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class ImagemProdutoDto {
  id: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descricao da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}
