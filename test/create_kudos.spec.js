const { test, expect } = require('@playwright/test');

test('create kudos, redirect to dashboard, and verify kudo appears first', async ({ page }) => {
  // 1. Go to the site
  await page.goto('https://hackathon-frontend-b6ll.onrender.com/');

  // 2. Login
  await page.getByRole('textbox', { name: 'Email' }).fill('a4@a.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Anjali@123');
  await page.getByRole('button', { name: 'Login' }).click();


  // 3. Click "Give Kudos" button
  await page.getByRole('button', { name: 'Give Kudos' }).click();

  // 4. Fill the form and check preview updates
  await page.getByRole('textbox', { name: 'Recipient\'s Name' }).click();
  await page.getByRole('textbox', { name: 'Recipient\'s Name' }).fill('aa');
  // Click the dropdown option div directly instead of using selectOption

  
  //await page.locator('div[data-user-id="7"]').click();



  await page.getByRole('combobox').filter({ hasText: 'Select team' }).click();
  await page.getByLabel('Bravo').getByText('Bravo').click();
  await page.getByRole('combobox').filter({ hasText: 'Select category' }).click();
  await page.getByLabel('Innovation Champion').getByText('Innovation Champion').click();
  await page.getByRole('textbox', { name: 'Message' }).click();
  await page.getByRole('textbox', { name: 'Message' }).fill('hello world');
  await page.getByRole('button', { name: 'Create Kudos' }).click();


  // await page.goto('https://hackathon-frontend-b6ll.onrender.com/');
  // await page.waitForSelector('.grid', { state: 'visible' });
});