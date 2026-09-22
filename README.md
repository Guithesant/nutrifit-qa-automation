# NutriFit — Automação de Testes (Playwright)

Suite de automação E2E para o app **NutriFit** (https://blazing-nutri-fit-plan.base44.app),
construída como parte de um projeto de portfólio de QA/Testador de Software.

Baseada na **Matriz de Casos de Teste** (`NutriFit_Matriz_Casos_de_Teste.xlsx`) e no
**Plano de Teste** (`NutriFit_Plano_de_Teste.docx`) elaborados previamente.

## Stack (100% gratuito)

- [Playwright](https://playwright.dev) — framework de automação (open source)
- [GitHub Actions](https://github.com/features/actions) — CI/CD gratuito (roda os testes a cada push)
- VS Code + extensão "Playwright Test for VSCode" (opcional, facilita rodar/depurar)

## Como rodar localmente

```bash
npm install
npx playwright install        # baixa os navegadores (Chromium, Firefox, WebKit)
npm test                      # roda toda a suíte
npm run test:headed           # roda visualmente, vendo o navegador
npm run test:report           # abre o relatório HTML da última execução
```

## ⚠️ Sobre autenticação (leia antes de rodar os testes autenticados)

O app não expõe uma rota própria de "/Login" — isso indica que o **Base44 gerencia
o login na própria plataforma**, antes de liberar o acesso às páginas do app
(`/Profile`, `/AdminDashboard`, etc.). Isso é comum em apps no-code/low-code.

Na prática, isso muda como automatizamos os casos de login (CT-007/CT-008 da matriz):

1. Automatizar o **formulário de login em si** só funciona se ele for um formulário
   simples (e-mail/senha). Se o Base44 usar login social (Google, etc.), a automação
   direta do formulário de login costuma **falhar por bloqueio anti-bot** — isso é
   uma limitação conhecida do mercado, não um erro seu.
2. **Solução usada por QAs profissionais nesse cenário: `storageState`.**
   Você faz login **uma vez manualmente**, salva a sessão autenticada em um arquivo,
   e reaproveita essa sessão em todos os testes seguintes — sem precisar repetir o
   login em cada teste.

### Como gerar o `auth.json` (sessão autenticada salva)

```bash
npx playwright codegen --save-storage=auth.json https://blazing-nutri-fit-plan.base44.app
```

Isso abre um navegador controlado pelo Playwright. Faça login manualmente com sua
conta de teste, navegue até a Home, e feche a janela. Um arquivo `auth.json` será
criado na raiz do projeto.

Depois, edite o `playwright.config.js` e descomente a linha:
```js
storageState: 'auth.json',
```

A partir daí, todos os testes já abrem "logados" automaticamente.

**Importante:** nunca suba o `auth.json` pro GitHub (ele contém sua sessão) — já
está listado no `.gitignore` deste projeto.

## Estrutura do projeto

```
nutrifit-playwright/
├── tests/
│   ├── 00-smoke.spec.js              # valida que todas as rotas reais do app carregam
│   └── 01-planos-alimentares.spec.js # CT-013, CT-016, CT-034 (tela Novo Plano)
├── playwright.config.js
├── package.json
└── .github/workflows/playwright.yml  # roda a suíte a cada push (GitHub Actions)
```

## Próximos passos sugeridos

1. Rodar `npm run codegen` (aponta para o app real) e comparar os seletores gerados
   com os usados em `01-planos-alimentares.spec.js` — ajustar onde o Base44 usar
   nomes internos diferentes do texto exibido na tela.
2. Ajustar os `TODO` nos arquivos de teste com as mensagens reais de sucesso/erro
   do app (elas estão comentadas de propósito, para você confirmar o texto exato).
3. Adicionar os demais casos **Crítica** da matriz (RN02, RN03, RN04, RNF01, login)
   seguindo o mesmo padrão dos arquivos já criados.
4. Subir este projeto para um repositório público no GitHub — o workflow do
   GitHub Actions já está configurado e roda automaticamente a cada push.
5. Linkar o repositório no LinkedIn/portfólio, com print do relatório HTML gerado
   pelo Playwright (`playwright-report/index.html`) como evidência de execução.
