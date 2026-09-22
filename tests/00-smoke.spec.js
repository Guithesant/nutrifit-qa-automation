// Smoke Test - CT-priority: valida que as páginas reais do app carregam sem erro.
// Rotas confirmadas a partir do próprio app publicado no Base44.
// Referência no Plano de Teste: nível "Smoke Test" (seção 6.1).

const { test, expect } = require('@playwright/test');

const rotasPublicas = [
  '/Home',
  '/Onboarding',
];

// Estas rotas provavelmente exigem autenticação (Base44 costuma gerenciar login
// na própria plataforma, antes de liberar o app). Se o teste falhar redirecionando
// para uma tela de login, isso é ESPERADO até você configurar o auth.json (ver README).
const rotasAutenticadas = [
  '/PlanSelection',
  '/MealPlanView',
  '/LogMeal',
  '/Progress',
  '/Profile',
  '/AdminDashboard',
  '/AdminUsers',
  '/AdminPlans',
];

test.describe('Smoke - rotas públicas', () => {
  for (const rota of rotasPublicas) {
    test(`a rota ${rota} deve carregar sem erro`, async ({ page }) => {
      const response = await page.goto(rota);
      expect(response.status(), `status HTTP de ${rota}`).toBeLessThan(400);
      // Garante que a SPA React realmente montou (não ficou só a tela branca)
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }
});

test.describe('Smoke - rotas autenticadas (requerem sessão válida)', () => {
  for (const rota of rotasAutenticadas) {
    test(`a rota ${rota} deve carregar (ou redirecionar para login de forma controlada)`, async ({ page }) => {
      const response = await page.goto(rota);
      expect(response.status(), `status HTTP de ${rota}`).toBeLessThan(400);
    });
  }
});
