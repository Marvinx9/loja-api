import { Module } from '@nestjs/common';
import { AuthenticacaoService } from './authenticacao.service';
import { AuthenticacaoController } from './authenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SEGREDO_JWT'),
          signOptions: { expiresIn: '72h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AuthenticacaoController],
  providers: [AuthenticacaoService],
})
export class AuthenticacaoModule {}
