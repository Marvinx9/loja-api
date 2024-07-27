import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CaracteristicaProduto } from './caracteristicaProduto.entity.dto';
import { ImagemProduto } from './imagemProduto.entity.dto';

export class PostProdutoDto {
  @IsNotEmpty({ message: 'Id do usuario não pode ser vazio' })
  @IsString()
  usuarioId: string;

  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Preco do produto não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  valor: number;

  @IsNotEmpty({ message: 'Quantidade do produto não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  quantidade: number;

  @IsNotEmpty({ message: 'Descricao do produto não pode ser vazio' })
  @IsString()
  descricao: string;

  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazio' })
  @IsString()
  categoria: string;

  @IsNotEmpty({ message: 'Caracteristica do produto não pode ser vazio' })
  @IsArray()
  caracteristicas: CaracteristicaProduto[];

  @IsNotEmpty({ message: 'Imagen do produto não pode ser vazio' })
  @IsArray()
  imagens: ImagemProduto[];
}
