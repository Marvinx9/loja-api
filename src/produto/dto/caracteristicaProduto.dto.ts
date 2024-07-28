import { IsNotEmpty, IsString } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDto {
  id: string;

  @IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  @IsString()
  descricao: string;

  produto: ProdutoEntity;
}
