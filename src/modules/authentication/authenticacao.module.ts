import { Module } from '@nestjs/common';
import { AuthenticacaoService } from './authenticacao.service';
import { AuthenticacaoController } from './authenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AuthenticacaoController],
  providers: [AuthenticacaoService],
})
export class AuthenticacaoModule {}
