import { StatusPedido } from '../enum/statuspedido.enum';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { IsArray, IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ItensPedidoDto } from './itensPedido.dto';

export class PostPedidoDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  valorTotal: number;

  status: StatusPedido;

  createdAt: string;

  @IsNotEmpty()
  @IsArray()
  itensPedido: ItensPedidoDto[];

  usuario: UsuarioEntity;
}
