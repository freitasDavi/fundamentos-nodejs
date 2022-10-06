# TYPORM - MIGRATIONS

## Versão velha que fomos obrigados a usar

npm run typeorm migration:create -n NomeDaMigration

npm run typeorm migration:run 

npm run typeorm migation:revert

## Como criar as migations na pasta certa
npm run typeorm migration:create ./src/database/migrations/nomeDaMigration

## Como rodar as migrations agora.

npm run typeorm migration:run -- -d ./src/database/data-source.ts
