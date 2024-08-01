import { PartialType } from '@nestjs/mapped-types';
import { PostUsuarioDto } from './postUsuario.dto';

export class PutUsuarioDto extends PartialType(PostUsuarioDto) {}
