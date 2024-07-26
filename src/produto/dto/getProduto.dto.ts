export class GetProdutoDto {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly preco: number,
    readonly quantidade: number,
  ) {}
}
