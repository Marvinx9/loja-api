import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticacaoService } from './authenticacao.service';
import { AuthenticacaoDto } from './dto/authenticacao.dto';

@Controller('authenticacao')
export class AuthenticacaoController {
  constructor(private readonly authenticacaoService: AuthenticacaoService) {}

  @Post('login')
  login(@Body() { email, senha }: AuthenticacaoDto) {
    return this.authenticacaoService.login(email, senha);
  }
}
