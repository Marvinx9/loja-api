import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PostProdutoDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Preco não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  preco: number;

  @IsNotEmpty({ message: 'Quantidade não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  quantidade: number;
}
