# Deploy — Firebase Hosting

## Configuração inicial (uma vez só)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

Na inicialização, responder:
- **Public directory**: `dist/estudo-bncc/browser`
- **Single-page app**: `Yes`
- **GitHub Actions deploy**: opcional

Arquivo `firebase.json` resultante:
```json
{
  "hosting": {
    "public": "dist/estudo-bncc/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

## Deploy do dia a dia

```bash
ng build && firebase deploy
```

## URL do projeto

Após o primeiro deploy, o Firebase gera uma URL no formato:
`https://estudo-bncc-XXXXX.web.app`

Para domínio customizado (opcional, grátis):
`firebase hosting:channel:deploy preview` — gera URL temporária para testar antes de publicar.

## Plano gratuito (Spark)

Inclui:
- 10 GB de armazenamento
- 360 MB/dia de transferência
- SSL automático
- CDN global

Mais que suficiente para uso familiar.
