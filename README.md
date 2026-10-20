# NutriFit — Projeto de QA (do requisito à automação)

Projeto de portfólio de QA: especifiquei, modelei e testei um aplicativo de nutrição (NutriFit), simulando um projeto real.

## Resultados
| Item | Resultado |
|---|---|
| Achados na revisão de requisitos/BPMN | 14 |
| Casos de teste | 42 |
| Defeitos documentados | 10 (1 crítico, corrigido) |
| Testes automatizados (Playwright) | 26/26 passando |

## Conteúdo
- `docs/` — Documento de Requisitos, Plano de Teste v1.2, Matriz de Casos de Teste e diagramas BPMN
- `tests/` — testes automatizados com Playwright (smoke + fluxo de criação de plano)
- `.github/workflows/` — execução automática dos testes (GitHub Actions)

## Técnicas aplicadas
Partição de equivalência, valor limite, tabela de decisão, transição de estado, caso de uso, regra de negócio e teste de segurança.

## Como rodar os testes
```bash
npm install
npx playwright install
npx playwright test
```
> Os testes de área logada exigem gerar um `auth.json` com `npx playwright codegen --save-storage=auth.json <url>`. O arquivo não é versionado.

## Próximos passos
- Executar casos ainda pendentes (CT-014, CT-020 e outros)
- Reteste dos defeitos abertos após correções no app

Autor: Guilherme Santana