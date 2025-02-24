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
import { ItemPedidoEntity } from '../pedido/itemPedido.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
