import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'caracteristicas_produto' })
export class CaracteristicaProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;
}
