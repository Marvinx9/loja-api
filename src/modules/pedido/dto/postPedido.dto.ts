import { StatusPedido } from '../enum/statuspedido.enum';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ItensPedidoDto } from './itensPedido.dto';
import { Type } from 'class-transformer';

export class PostPedidoDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  valorTotal: number;

  @IsNotEmpty()
  status: StatusPedido;

  @IsNotEmpty()
  @IsArray()
  itensPedido: ItensPedidoDto[];

  @IsNotEmpty()
  usuario: UsuarioEntity;
}
