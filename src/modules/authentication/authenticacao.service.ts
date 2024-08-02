import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticacaoService {
  login(email: string, senha: string) {
    console.log(email, senha);
  }
}
