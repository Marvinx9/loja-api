import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(contexto: ExecutionContext): boolean {
    const requisicao = contexto.switchToHttp().getRequest();
    const token = this.extrairTokenDoCabecalho(requisicao);
    return false;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    //formato do cabeçalho authorization: "Bearer <valor do jwt>" -> protocolo HTTP
    const [tipo, token] = requisicao.headers.authorization?
  }
}
