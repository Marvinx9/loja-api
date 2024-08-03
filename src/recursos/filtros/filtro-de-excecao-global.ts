import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNativo: ConsoleLogger,
  ) {}
  catch(execao: unknown, host: ArgumentsHost) {
    this.loggerNativo.error(execao);
    console.error(execao);

    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    const { status, body } =
      execao instanceof HttpException
        ? {
            status: execao.getStatus(),
            body: execao.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requisicao),
            },
          };

    httpAdapter.reply(resposta, body, status);
  }
}
