import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'imagens_produto' })
export class ImagemProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'decricao', length: 100, nullable: false })
  descricao: string;
}
