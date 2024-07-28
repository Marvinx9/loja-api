import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CaracteristicaProdutoEntity } from './caracteristicaProduto.entity';
import { ImagemProdutoEntity } from './imagemProduto.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuario_id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @OneToMany(
    () => CaracteristicaProdutoEntity,
    (caracteristicaProdutoEntity) => caracteristicaProdutoEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: CaracteristicaProdutoEntity[];

  @OneToMany(
    () => ImagemProdutoEntity,
    (imagemProdutoEntity) => imagemProdutoEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ImagemProdutoEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;
}
