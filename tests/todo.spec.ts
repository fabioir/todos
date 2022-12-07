import { expect, test } from '@playwright/test';

test('todos are displayed', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const todo = page.getByTestId('todo-item');

  await expect(todo).toBeTruthy();
});
