import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusPedido } from '../enum/statuspedido.enum';
import { ItensPedidoDto } from './itensPedido.dto';
import { UsuarioEntity } from 'src/modules/usuario/usuario.entity';

export class PutPedidoDto {
  @IsOptional()
  id: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valorTotal: number;

  @IsOptional()
  status: StatusPedido;

  @IsOptional()
  @IsArray()
  itensPedido: ItensPedidoDto[];

  @IsOptional()
  usuario: UsuarioEntity;
}
