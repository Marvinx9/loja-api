import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'imagens_produto' })
export class ImagemProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'decricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens)
  produto: ProdutoEntity;
}
