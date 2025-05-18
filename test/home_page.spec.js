const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the website before each test
    await page.goto('https://hackathon-frontend-b6ll.onrender.com/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Login before each test
    await page.getByRole('textbox', { name: 'Email' }).fill('a4@a.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Anjali@123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for login to complete and redirect
    await page.waitForURL('https://hackathon-frontend-b6ll.onrender.com/');
    // Wait for the grid to be visible after login
    await page.waitForSelector('.grid', { state: 'visible', timeout: 15000 });
  });

  test('should load the home page successfully', async ({ page }) => {
    // Verify main elements are visible
    await expect(page.locator('.grid')).toBeVisible();
    // Wait for dropdowns to be visible
    await page.waitForSelector('select', { state: 'visible' });
    const dropdowns = await page.locator('select').all();
    expect(dropdowns.length).toBeGreaterThanOrEqual(2);
  });


  test('should filter by Alpha team', async ({ page }) => {
    const teamDropdown = page.locator('select').first();
    await teamDropdown.selectOption('Alpha');
    await page.waitForSelector('.grid', { state: 'visible' });
    const cards = await page.locator('.kudo-card').all();
    for (const card of cards) {
      const teamText = await card.locator('.team-name').textContent();
      expect(teamText).toBe('Alpha');
    }
  });

  test('should filter by Bravo team', async ({ page }) => {
    const teamDropdown = page.locator('select').first();
    await teamDropdown.selectOption('Bravo'); 
    await page.waitForSelector('.grid', { state: 'visible' });
    const cards = await page.locator('.kudo-card').all();
    for (const card of cards) {
      const teamText = await card.locator('.team-name').textContent();
      expect(teamText).toBe('Bravo');
    }
  });

  test('should handle category filtering', async ({ page }) => {
    // Wait for and get the category dropdown
    await page.waitForSelector('select', { state: 'visible' });
    const categoryDropdown = page.locator('select').nth(1);
    
    // Select "All Categories" first
    await categoryDropdown.selectOption('All Categories');
    await page.waitForSelector('.grid', { state: 'visible' });
    const allCards = await page.locator('.kudo-card').all();
    const initialCount = allCards.length;
    expect(initialCount).toBeGreaterThanOrEqual(0);
    
    // Select Great Teamwork category
    await categoryDropdown.selectOption('Great Teamwork');
    await page.waitForSelector('.grid', { state: 'visible' });
    const filteredCards = await page.locator('.kudo-card').all();
    
    // Verify we have filtered cards
    expect(filteredCards.length).toBeLessThanOrEqual(initialCount);
    
    // Verify cards are filtered by category
    for (const card of filteredCards) {
      const categoryText = await card.locator('.category-name').textContent();
      expect(categoryText).toBe('Great Teamwork');
    }
  });

  test('should handle date sorting', async ({ page }) => {
    // Wait for and get the date dropdown
    await page.waitForSelector('select', { state: 'visible' });
    const dateDropdown = page.locator('select').last();
    
    // Test Most Recent sorting
    await dateDropdown.selectOption('Most Recent');
    await page.waitForSelector('.grid', { state: 'visible' });
    const cards = await page.locator('.kudo-card').all();
    
    if (cards.length >= 2) {
      const firstCardDate = await cards[0].locator('.date').textContent();
      const secondCardDate = await cards[1].locator('.date').textContent();
      const firstDate = new Date(firstCardDate);
      const secondDate = new Date(secondCardDate);
      expect(firstDate >= secondDate).toBeTruthy();
    }
    
    // Test Oldest First sorting
    await dateDropdown.selectOption('Oldest');
    await page.waitForSelector('.grid', { state: 'visible' });
    const sortedCards = await page.locator('.kudo-card').all();
    
    if (sortedCards.length >= 2) {
      const firstCardDate = await sortedCards[0].locator('.date').textContent();
      const secondCardDate = await sortedCards[1].locator('.date').textContent();
      const firstDate = new Date(firstCardDate);
      const secondDate = new Date(secondCardDate);
      expect(firstDate <= secondDate).toBeTruthy();
    }
  });

  test('should verify kudo card content', async ({ page }) => {
    // Wait for cards to be visible
    await page.waitForSelector('.grid', { state: 'visible' });
    const cards = await page.locator('.kudo-card').all();
    
    if (cards.length > 0) {
      const firstCard = cards[0];
      
      // Verify card elements
      await expect(firstCard.locator('.sender-name')).toBeVisible();
      await expect(firstCard.locator('.receiver-name')).toBeVisible();
      await expect(firstCard.locator('.category-name')).toBeVisible();
      await expect(firstCard.locator('.message-text')).toBeVisible();
      await expect(firstCard.locator('.date')).toBeVisible();
      
      // Verify content is not empty
      const sender = await firstCard.locator('.sender-name').textContent();
      const receiver = await firstCard.locator('.receiver-name').textContent();
      const category = await firstCard.locator('.category-name').textContent();
      const message = await firstCard.locator('.message-text').textContent();
      
      expect(sender?.trim()).toBeTruthy();
      expect(receiver?.trim()).toBeTruthy();
      expect(category?.trim()).toBeTruthy();
      expect(message?.trim()).toBeTruthy();
    }
  });

  test('should maintain filter state after navigation', async ({ page }) => {
    // Wait for dropdowns to be visible
    await page.waitForSelector('select', { state: 'visible' });
    
    // Set specific filters
    await page.locator('select').first().selectOption('Alpha');
    await page.locator('select').nth(1).selectOption('Great Teamwork');
    await page.locator('select').last().selectOption('Most Recent');
    
    // Wait for filtered cards
    await page.waitForSelector('.grid', { state: 'visible' });
    const initialCards = await page.locator('.kudo-card').all();
    
    // Get initial card data for comparison
    const initialCardData = await Promise.all(initialCards.map(async card => ({
      sender: await card.locator('.sender-name').textContent(),
      receiver: await card.locator('.receiver-name').textContent(),
      category: await card.locator('.category-name').textContent()
    })));
    
    // Refresh the page
    await page.reload();
    await page.waitForSelector('.grid', { state: 'visible' });
    
    // Verify filters are maintained
    const currentCards = await page.locator('.kudo-card').all();
    const currentCardData = await Promise.all(currentCards.map(async card => ({
      sender: await card.locator('.sender-name').textContent(),
      receiver: await card.locator('.receiver-name').textContent(),
      category: await card.locator('.category-name').textContent()
    })));
    
    // Compare initial and current card data
    expect(currentCardData.length).toBe(initialCardData.length);
    for (let i = 0; i < currentCardData.length; i++) {
      expect(currentCardData[i].category).toBe('Great Teamwork');
    }
  });
}); 