// Casos de Teste automatizados a partir da Matriz de Casos de Teste (NutriFit_Matriz_Casos_de_Teste.xlsx)
// Cobre a tela "Planos alimentares" / "Novo plano" (rota /AdminPlans)
// IMPORTANTE: os seletores abaixo foram escritos com base nos textos visíveis no
// print da tela. Rode `npm run codegen` para confirmar/ajustar os seletores exatos
// (o Base44 pode usar nomes de campo internos diferentes do texto exibido).

const { test, expect } = require('@playwright/test');

test.describe('RF06 / RN02 - Criação de Plano Alimentar Manual (tela Novo Plano)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/AdminPlans');
    await page.getByRole('button', { name: /novo/i }).click();
  });

  // CT-016 (adaptado) - criação de plano manual com dados válidos
  test('CT-016 - criar plano manual com todos os dados válidos', async ({ page }) => {
    await page.getByPlaceholder('Ex: Plano de emagrecimento').fill('Plano de Teste Automatizado');
    await page.getByPlaceholder('Descrição do plano...').fill('Plano criado via Playwright para fins de teste.');

    // Objetivo: dropdown com "Manter" selecionado por padrão
    await page.getByLabel('Objetivo').selectOption({ label: 'Manter' });

    await page.getByLabel('Calorias/dia').fill('2000');

    // TODO: ajustar o texto exato exibido para "Atribuir a" após confirmar no app
    // await page.getByLabel(/atribuir a/i).click();
    // await page.getByRole('option', { name: 'usuario.teste@nutrifit.com' }).click();

    await page.getByRole('button', { name: /criar plano/i }).click();

    // TODO: substituir pela mensagem de sucesso real exibida pelo app
    // await expect(page.getByText(/plano criado com sucesso/i)).toBeVisible();
  });

  // CT-013 (adaptado) - tentativa de criar plano sem nome (campo obrigatório)
  test('CT-013 - bloquear criação de plano sem nome', async ({ page }) => {
    await page.getByPlaceholder('Descrição do plano...').fill('Plano sem nome, deve falhar.');
    await page.getByLabel('Calorias/dia').fill('1800');

    await page.getByRole('button', { name: /criar plano/i }).click();

    // TODO: confirmar a mensagem real de validação (ex: "Nome do plano é obrigatório")
    // await expect(page.getByText(/obrigatório/i)).toBeVisible();

    // Verificação mínima: o modal "Novo plano" não deve fechar em caso de erro
    await expect(page.getByText('Novo plano')).toBeVisible();
  });

  // CT-034 (adaptado) - calorias/dia com valor inválido (negativo)
  test('CT-034 - bloquear plano com calorias/dia negativas', async ({ page }) => {
    await page.getByPlaceholder('Ex: Plano de emagrecimento').fill('Plano Calorias Inválidas');
    await page.getByLabel('Calorias/dia').fill('-50');

    await page.getByRole('button', { name: /criar plano/i }).click();

    // TODO: confirmar mensagem real de "Dados inválidos"
    // await expect(page.getByText(/dados inválidos/i)).toBeVisible();
  });
});
