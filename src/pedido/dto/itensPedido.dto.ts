import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { StatusPedido } from '../enum/statuspedido.enum';
import { PedidoEntity } from '../pedido.entity';
import { Type } from 'class-transformer';

export class ItensPedidoDto {
  @IsUUID()
  produtoId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantidade: number;

  precoVenda: StatusPedido;

  createdAt: string;

  pedido: PedidoEntity;
}
