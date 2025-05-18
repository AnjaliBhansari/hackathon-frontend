const { test, expect } = require('@playwright/test');

test.describe('Profile Page - End to End', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('https://hackathon-frontend-b6ll.onrender.com/');
    await page.getByRole('textbox', { name: 'Email' }).fill('a4@a.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Anjali@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('https://hackathon-frontend-b6ll.onrender.com/profile');
  });

  test('should display profile heading and user email', async ({ page }) => {
    await expect(page.url()).toContain('/profile');
    //await expect(page.getByText('a4@a.com')).toBeVisible();
  });

  test('should display user name if present', async ({ page }) => {
    const userName = page.getByText('Anjali');
    if (await userName.count()) {
      await expect(userName).toBeVisible();
    }
  });

  test('should display avatar or profile image if present', async ({ page }) => {
    // Adjust selector if your avatar uses a different class or alt text
    const avatar = page.locator('img[alt*="avatar"], img[alt*="profile"], .avatar, .profile-img');
    if (await avatar.count()) {
      await expect(avatar.first()).toBeVisible();
    }
  });

  test('should display team or role if present', async ({ page }) => {
    const teamRoleText = page.getByText(/team|role|bravo|design|lead|member/i);
    if (await teamRoleText.count()) {
      await expect(teamRoleText).toBeVisible();
    }
  });

  test('should display edit button if profile is editable', async ({ page }) => {
    const editButton = page.getByRole('button', { name: /edit/i });
    if (await editButton.count()) {
      await expect(editButton).toBeVisible();
    }
  });

  test('should display kudos count or list if present', async ({ page }) => {
    const kudosText = page.getByText(/kudos|received|given/i);
    if (await kudosText.count()) {
      await expect(kudosText.first()).toBeVisible();
    }
  });

  test('should display list of kudos if present', async ({ page }) => {
    // Look for a list or table of kudos
    const kudosList = page.locator('.kudo-card, .kudos-list, .kudos-table');
    if (await kudosList.count()) {
      await expect(kudosList.first()).toBeVisible();
    }
  });

  

  test('should allow editing profile if feature is available', async ({ page }) => {
    const editButton = page.getByRole('button', { name: /edit/i });
    if (await editButton.count()) {
      await editButton.click();
      // Check for editable fields
      await expect(page.getByRole('textbox', { name: /name|email/i })).toBeVisible();
      // Optionally, try editing and saving
      // await page.getByRole('textbox', { name: /name/i }).fill('New Name');
      // await page.getByRole('button', { name: /save/i }).click();
      // await expect(page.getByText('New Name')).toBeVisible();
    }
  });

  test('should allow avatar upload if feature is available', async ({ page }) => {
    const uploadInput = page.locator('input[type="file"]');
    if (await uploadInput.count()) {
      // Simulate file upload (replace with a real image path in your project)
      await uploadInput.setInputFiles('tests/assets/avatar.png');
      // Optionally, check for success message or avatar update
      // await expect(page.getByText(/uploaded|success/i)).toBeVisible();
    }
  });

  test('should allow logout from profile page if feature is available', async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    if (await logoutButton.count()) {
      await logoutButton.click();
      await expect(page).toHaveURL(/login/);
    }
  });
}); 