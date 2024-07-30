import { StatusPedido } from '../enum/statuspedido.enum';

export class GetPedidoDto {
  constructor(
    readonly id: string,
    readonly status: StatusPedido,
    readonly valorTotal: number,
  ) {}
}
