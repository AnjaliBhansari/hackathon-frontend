// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
    const LOGIN_URL = 'https://hackathon-frontend-b6ll.onrender.com/login';
    
    test.beforeEach(async ({ page }) => {
        // Navigate to login page before each test
        await page.goto(LOGIN_URL);
    });

    test('should display login page elements correctly', async ({ page }) => {
        // Check welcome text
        await expect(page.getByText('Welcome to Avesta Kudos')).toBeVisible();
        
        // Check form elements
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
        
        // Check signup link
        await expect(page.getByText('Don\'t have an account?')).toBeVisible();
        await expect(page.getByText('Sign up')).toBeVisible();
        
        // Check terms text
       // await expect(page.getByText('Terms of Service and Privacy Policy')).toBeVisible();
    });

    test('should show browser validation for empty fields', async ({ page }) => {
        await page.goto('https://hackathon-frontend-b6ll.onrender.com/login');
        
        // Test completely empty fields
        await page.getByRole('button', { name: 'Login' }).click();

        // The browser should focus the first invalid field (email)
        const emailInput = await page.getByRole('textbox', { name: 'Email' });
        await expect(emailInput).toBeFocused();

        // The input should be invalid
        const isValid = await emailInput.evaluate(el => /** @type {HTMLInputElement} */ (el).checkValidity());
        expect(isValid).toBe(false);

        // The input should have the required attribute
        await expect(emailInput).toHaveAttribute('required', '');

        // Test email filled but empty password
        await emailInput.fill('test@example.com');
        await page.getByRole('button', { name: 'Login' }).click();

        // The browser should focus the empty password field
        const passwordInput = await page.getByRole('textbox', { name: 'Password' });
        await expect(passwordInput).toBeFocused();

        // The password input should be invalid
        const passwordIsValid = await passwordInput.evaluate(el => /** @type {HTMLInputElement} */ (el).checkValidity());
        expect(passwordIsValid).toBe(false);

        // The password input should have the required attribute
        await expect(passwordInput).toHaveAttribute('required', '');
    });

    test('should show validation error for invalid email', async ({ page }) => {
        // Test various invalid email formats
        const invalidEmails = [
            'invalid-email',           // No @ symbol
            '@nodomain',              // No local part
            'no@domain.',             // Incomplete domain
            'no space@domain.com',    // Contains space
            //'.invalid@domain.com',    // Starts with dot
            'invalid@.com',           // Missing domain name
            'invalid@domain..com'     // Multiple dots
        ];

        const expectedErrors = {
            'invalid-email': 'Please include an \'@\' in the email address',
            '@nodomain': 'Please enter a part followed by \'@\'',
            'no@domain.': '\'.\' is used at a wrong position',
            'no space@domain.com': 'A part followed by \'@\' should not contain the symbol \' \'.', 
            // '.invalid@domain.com': '\'.\' is used at a wrong position',
            'invalid@.com': '\'.\' is used at a wrong position',
            'invalid@domain..com': '\'.\' is used at a wrong position'
        };

        for (const invalidEmail of invalidEmails) {
            // Fill in the invalid email
            await page.getByRole('textbox', { name: 'Email' }).fill(invalidEmail);
            await page.getByRole('textbox', { name: 'Password' }).fill('password123');
            
            // Click login to trigger validation
            await page.getByRole('button', { name: 'Login' }).click();

            // Get the email input element
            const emailInput = await page.getByRole('textbox', { name: 'Email' });

            // Verify validation message
            const validationMessage = await emailInput.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
            expect(validationMessage).toContain(expectedErrors[invalidEmail]);

            // Verify input is marked as invalid
            const isValid = await emailInput.evaluate(el => /** @type {HTMLInputElement} */ (el).checkValidity());
            expect(isValid).toBe(false);

            // Clear the input for next iteration
            await emailInput.clear();
        }
    });

    test('should show validation error for short password', async ({ page }) => {
        // Enter valid email but short password
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('123');
        
        // Click login
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Verify error message
        await expect(page.getByText('Invalid email or password')).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
        // Enter invalid credentials
        await page.getByRole('textbox', { name: 'Email' }).fill('wrong@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
        
        // Click login
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Verify error message
        await expect(page.getByText('Invalid email or password')).toBeVisible();
    });

    // test('should successfully login with valid credentials', async ({ page }) => {
    //     // Enter valid credentials
    //     await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    //     await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
        
    //     // Click login
    //     await page.getByRole('button', { name: 'Login' }).click();
        
    //     // Verify successful login (redirect to dashboard or home page)
    //     await expect(page).toHaveURL(/.*dashboard|.*home/);
    // });

    test('should navigate to signup page', async ({ page }) => {
        // Click signup link
        await page.getByText('Sign up').click();
        
        // Verify navigation to signup page
        await expect(page).toHaveURL(/.*signup|.*register/);
    });

    test('should maintain form data after failed login', async ({ page }) => {
        // Enter credentials
        const email = 'test@example.com';
        const password = 'Password123';
        
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        
        // Click login with wrong password
        await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Verify error message
        await expect(page.getByText('Invalid email or password')).toBeVisible();
        
        // Verify email is still filled
        await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(email);
    });

    test('should handle network error gracefully', async ({ page, context }) => {
        // Simulate offline mode using context
        await context.setOffline(true);
        
        // Try to login
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Verify error message
        await expect(page.getByText('Invalid email or password')).toBeVisible();
        
        // Reset offline mode
        await context.setOffline(false);
    });
}); 