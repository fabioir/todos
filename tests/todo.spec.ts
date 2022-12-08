import { expect, test } from '@playwright/test';

test('todos are displayed', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const todo = page.getByTestId('todo-item');

  await expect(todo).toHaveCount(30);
});

test('todo details are displayed', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await page
    .locator('todos-item')
    .filter({ hasText: 'Do something nice for someone I care about' })
    .getByRole('button', { name: 'Details' })
    .click();

  await expect(page.locator('#user-id')).toHaveValue('26');
  await expect(page.locator('#todo-id')).toHaveValue('1');
  await expect(page.locator('#completed')).toBeChecked();
  await expect(page.locator('#todo')).toHaveValue(
    'Do something nice for someone I care about'
  );
});

test('todo is checked', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await page
    .locator('todos-item')
    .filter({ hasText: 'Watch a classic movie' })
    .getByRole('checkbox', { checked: false })
    .click();

  await page
    .locator('todos-item')
    .filter({ hasText: 'Watch a classic movie' })
    .getByRole('button', { name: 'Details' })
    .click();

  await expect(page.locator('#completed')).toBeChecked();
});

test('todo updated', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await page
    .locator('todos-item')
    .filter({ hasText: 'Do something nice for someone I care about' })
    .getByRole('button', { name: 'Details' })
    .click();

  await page.locator('#submitButton').getByRole('button').click();
  const textArea = await page.locator('#todo');
  await textArea.clear();
  await textArea.type('Edited todo');
  await page.locator('#submitButton').getByRole('button').click();

  await expect(
    page
      .locator('todos-item')
      .filter({ hasText: 'Do something nice for someone I care about' })
  ).toHaveCount(0);
  await expect(
    page.locator('todos-item').filter({ hasText: 'Edited todo' })
  ).toHaveCount(1);
});

test('todo created', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await page.locator('#createButton').getByRole('button').click();

  const userId = await page.locator('#user-id');
  await userId.type('1');
  const textArea = await page.locator('#todo');
  await textArea.type('Created todo');

  await page.locator('#submitButton').getByRole('button').click();

  await expect(
    page.locator('todos-item').filter({ hasText: 'Created todo' })
  ).toHaveCount(1);
});

test('todo deleted', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await page
    .locator('todos-item')
    .filter({ hasText: 'Do something nice for someone I care about' })
    .getByRole('button', { name: 'Details' })
    .click();

  await page.locator('#deleteButton').getByRole('button').click();

  await expect(
    page
      .locator('todos-item')
      .filter({ hasText: 'Do something nice for someone I care about' })
  ).toHaveCount(0);
});
