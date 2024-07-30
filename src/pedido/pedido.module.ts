import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
