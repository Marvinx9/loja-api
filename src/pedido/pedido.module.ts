import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
