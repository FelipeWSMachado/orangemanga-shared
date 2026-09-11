# orangemanga-shared

Modelos Mongoose, validação (zod), config e o `StorageProvider` (S3/MinIO) compartilhados entre `orangemanga-web` e `orangemanga-api-home`. Consumido por ambos como dependência git (não é publicado no npm).

Exports: `@orangemanga/shared` (config/validation/storage — seguro pra bundle de browser/edge), `@orangemanga/shared/db` (models + `connectMongo` — só server-side, nunca importar de middleware/edge ou client component).

## Deploy

Não tem deploy próprio — vira efeito nos dois consumidores. Depois de qualquer mudança aqui:

```bash
git add -A
git commit -m "..."
git push origin master
```

E então, em **cada** repo que consome (`orangemanga-web`, `orangemanga-api-home`):

```bash
pnpm update @orangemanga/shared
pnpm exec tsc --noEmit   # confirma que nada quebrou
```

Isso baixa o commit mais recente de `master` (a dependência é `github:FelipeWSMachado/orangemanga-shared`, sem pin de versão/commit) e regrava o `pnpm-lock.yaml`. Sem esse passo, quem consome continua rodando a versão antiga em cache do pnpm store — inclusive em produção (Vercel/servidor caseiro rodam `pnpm install` no próprio deploy, então basta commitar/pushar o consumidor depois de atualizar a lockfile local).

## Cuidados

- Qualquer novo model precisa ser exportado em `src/db/models/index.ts`.
- Nunca definir um model Mongoose num app consumidor com `import mongoose from "mongoose"` direto — sempre aqui, registrado uma vez. Um model definido fora daqui pode acabar numa instância de mongoose separada e nunca conectada (já aconteceu com `RateLimitHit`, causou 500 em produção).
