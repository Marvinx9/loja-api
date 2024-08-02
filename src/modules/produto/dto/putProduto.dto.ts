import { PartialType } from '@nestjs/mapped-types';
import { PostProdutoDto } from './postProduto.dto';

export class PutProdutoDto extends PartialType(PostProdutoDto) {}
