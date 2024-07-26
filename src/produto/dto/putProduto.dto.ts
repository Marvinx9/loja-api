import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PutProdutoDto {
  @IsOptional({ message: 'Nome não pode ser vazio' })
  @IsString()
  nome?: string;

  @IsOptional({ message: 'Preco não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  preco?: number;

  @IsOptional({ message: 'Quantidade não pode ser vazio' })
  @IsNumber()
  @Type(() => Number)
  quantidade?: number;
}
