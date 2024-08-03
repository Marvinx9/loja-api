# Projeto API NestJS

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/), um framework para construção de aplicações Node.js escaláveis e eficientes. A API possui diversas funcionalidades avançadas, incluindo migrações com TypeORM, criptografia, operações CRUD, autenticação e muito mais.

## Funcionalidades

- **Migrações com TypeORM**: Gerenciamento de migrações do banco de dados.
- **Criptografia com bcrypt**: Criptografia de senhas e outros dados sensíveis.
- **CRUD**:
  - Usuário: Criação, leitura, atualização e exclusão de usuários.
  - Pedido: Criação, leitura, atualização e exclusão de pedidos.
  - Produto: Criação, leitura, atualização e exclusão de produtos.
- **Criação de Decorators**: Implementação de decorators personalizados dentro do projeto.
- **Conexão com PostgreSQL**: Integração e configuração do banco de dados PostgreSQL.
- **Autenticação de Usuário**: Proteção das rotas com autenticação de usuários utilizando JWT e Guards.
- **Filtros de Exceções**: Manejo e captura de exceções.
- **Docker**:
  - Banco de dados PostgreSQL: Uso de Docker para criar e gerenciar o banco de dados PostgreSQL.
  - Redis: Uso de Docker para criar e gerenciar o Redis.
- **Gerenciamento de Cache**: Uso de `cache-manager` e Redis para caching.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [cache-manager](https://www.npmjs.com/package/cache-manager)

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Marvinx9/loja-api.git
   cd loja-api
   
