import { Module } from '@nestjs/common';
import { AuthenticacaoService } from './authenticacao.service';
import { AuthenticacaoController } from './authenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_SECRETO',
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [AuthenticacaoController],
  providers: [AuthenticacaoService],
})
export class AuthenticacaoModule {}
