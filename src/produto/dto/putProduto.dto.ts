import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ImagemProdutoDto } from './imagemProduto.dto';
import { CaracteristicaProdutoDto } from './caracteristicaProduto.dto';

export class PutProdutoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valor?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantidade?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsArray()
  @Type(() => CaracteristicaProdutoDto)
  caracteristicas?: CaracteristicaProdutoDto[];

  @IsOptional()
  @IsArray()
  @Type(() => ImagemProdutoDto)
  imagens?: ImagemProdutoDto[];
}
