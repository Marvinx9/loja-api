import { Module } from '@nestjs/common';
import { AuthenticacaoService } from './authenticacao.service';
import { AuthenticacaoController } from './authenticacao.controller';

@Module({
  controllers: [AuthenticacaoController],
  providers: [AuthenticacaoService],
})
export class AuthenticacaoModule {}
