// @ts-check
import { test, expect } from '@playwright/test';

// Page Object Model for Registration Page
class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.name = page.getByRole('textbox', { name: 'Name' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password' });
        this.roleCombobox = page.getByRole('combobox');
        this.roleOption = (role) => page.getByLabel(role).getByText(role);
        this.submitButton = page.getByRole('button', { name: 'Create Account' });
        this.loginLink = page.getByRole('link', { name: 'Sign up' });
        this.errorMessages = page.locator('.error, .has-error, .alert-danger');
        this.successMessage = page.locator('.success-message, .alert-success');
    }

    async goto() {
        await this.page.goto('https://hackathon-frontend-b6ll.onrender.com/');
        await this.loginLink.click();
    }

    async fillForm({
        name = '',
        email = '',
        password = '',
        confirmPassword = '',
        role = ''
    }) {
        if (name !== undefined) await this.name.fill(name);
        if (email !== undefined) await this.email.fill(email);
        if (password !== undefined) await this.password.fill(password);
        if (confirmPassword !== undefined) await this.confirmPassword.fill(confirmPassword);
        if (role !== undefined && role !== '') {
            await this.roleCombobox.click();
            await this.roleOption(role).click();
        }
    }

    async submit() {
        await this.submitButton.click();
    }

    async getErrorMessages() {
        return await this.errorMessages.allTextContents();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }
}

test.describe('Signup Form Tests', () => {
    let registrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
    });

    // Positive Test Case
    // test('should register successfully with valid data for Team Member', async () => {
    //     await registrationPage.fillForm({
    //         name: 'John Doe',
    //         email: `test${Math.random().toString(36).substring(2)}@example.com`,
    //         password: 'Password123!',
    //         confirmPassword: 'Password123!',
    //         role: 'Team Member'
    //     });
    //     await registrationPage.submit();
    //     await expect(registrationPage.page).toHaveURL('https://hackathon-frontend-b6ll.onrender.com');
    //     // const successMessage = await registrationPage.getSuccessMessage();
    //     // expect(successMessage).toMatch(/success|registered|Welcome|Create/i);
    // }); 

    // test('should register successfully with valid data for Team Lead', async () => {
    //     await registrationPage.fillForm({
    //         name: 'John Doe',
    //         email: `test${Math.random().toString(36).substring(2)}@example.com`,
    //         password: 'Password123!',
    //         confirmPassword: 'Password123!',
    //         role: 'Team Lead'
    //     });
    //     await registrationPage.submit();
    //     await expect(registrationPage.page).toHaveURL('https://hackathon-frontend-b6ll.onrender.com');
    // }); 
    // Negative Test Cases
    test('should show error for empty required fields', async () => {

       // Test empty role field
        // await registrationPage.fillForm({
        //     name: 'John Doe',
        //     email: 'test@example.com',
        //     password: 'Password123!',
        //     confirmPassword: 'Password123!'
        // });
        // await registrationPage.submit();
        // //await page.getByText('Role', { exact: true }).click();
        // const roleValidation = await registrationPage.roleCombobox.evaluate(el => /** @type {HTMLSelectElement} */ (el).validationMessage);
        // console.log(roleValidation);
        // expect(roleValidation).toContain('Please select an item in the list.');
        
        // Test empty name field
        await registrationPage.fillForm({
            email: 'test@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            role: 'Team Member'
        });
        await registrationPage.submit();
        const nameValidation = await registrationPage.name.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
        expect(nameValidation).toContain('Please fill in this field.');
        
        
        // Test empty email field
        await registrationPage.fillForm({
            name: 'John Doe',
            password: 'Password123!', 
            confirmPassword: 'Password123!',
            role: 'Team Member'
        });
        await registrationPage.submit();
        const emailValidation = await registrationPage.email.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
        expect(emailValidation).toContain('Please fill in this field.');
        

        // Test empty password field
        await registrationPage.fillForm({
            name: 'John Doe',
            email: 'test@example.com',
            confirmPassword: 'Password123!',
            role: 'Team Member'
        });
        await registrationPage.submit();
        const passwordValidation = await registrationPage.password.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
        expect(passwordValidation).toContain('Please fill in this field.');

        // Test empty confirm password field
        await registrationPage.fillForm({
            name: 'John Doe',
            email: 'test@example.com',
            password: 'Password123!',
            role: 'Team Member'
        });
        await registrationPage.submit();
        const confirmPasswordValidation = await registrationPage.confirmPassword.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
        expect(confirmPasswordValidation).toContain('Please fill in this field.');
       
        
    });
    test('should show validation error for invalid email formats', async () => {
        const invalidEmails = [
            'invalid-email',           // No @ symbol
            '@nodomain',              // No local part
            'no@domain.',             // Incomplete domain
            'no space@domain.com',    // Contains space
            'invalid@.com',           // Missing domain name
            'invalid@domain..com'     // Multiple dots
        ];

        const expectedErrors = {
            'invalid-email': 'Please include an \'@\' in the email address',
            '@nodomain': 'Please enter a part followed by \'@\'',
            'no@domain.': '\'.\' is used at a wrong position',
            'no space@domain.com': 'A part followed by \'@\' should not contain the symbol \' \'.', 
            'invalid@.com': '\'.\' is used at a wrong position',
            'invalid@domain..com': '\'.\' is used at a wrong position'
        };

        for (const invalidEmail of invalidEmails) {
            await registrationPage.fillForm({
                name: 'John Doe',
                email: invalidEmail,
                password: 'Password123!',
                confirmPassword: 'Password123!',
                role: 'Team Member'
            });
            
            await registrationPage.submit();

            // Get the email input element and verify validation message
            const validationMessage = await registrationPage.email.evaluate(el => /** @type {HTMLInputElement} */ (el).validationMessage);
            expect(validationMessage).toContain(expectedErrors[invalidEmail]);

            // Verify input is marked as invalid
            const isValid = await registrationPage.email.evaluate(el => /** @type {HTMLInputElement} */ (el).checkValidity());
            expect(isValid).toBe(false);
        }
    });


    test('should show error for password mismatch', async () => {
        await registrationPage.fillForm({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'Password123!',
            confirmPassword: 'DifferentPassword123!',
            role: 'Team Member'
        });
        await registrationPage.submit();
        await expect(registrationPage.page.getByText('Passwords do not match')).toBeVisible();
    });

    test('should show error for invalid passwords', async () => {
        const invalidPasswords = [
            '123', // Too short
            'abcdefgh', // Missing uppercase, number, and special char
            'ABCDEFGH', // Missing lowercase, number, and special char
            'abcdEFGH', // Missing number and special char
            'abcd1234', // Missing uppercase and special char
            'ABCD1234', // Missing lowercase and special char
            'abcdEFG1', // Missing special char
            // 'abcdEFG!', // Missing number
            // 'abcdEF1!', // Too short (7 chars)
        ];

        const expectedError = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';

        for (const invalidPassword of invalidPasswords) {
            await registrationPage.fillForm({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: invalidPassword,
                confirmPassword: invalidPassword,
                role: 'Team Member'
            });
            await registrationPage.submit();
            await expect(registrationPage.page.getByText(expectedError)).toBeVisible();
        }
    });

    // test('should navigate to login page when clicking login link', async () => {
    //     await registrationPage.clickLoginLink();
    //     await expect(registrationPage.page).toHaveURL(/.*\/login/);
    // });

    // test('should validate name field restrictions', async () => {
    //     const invalidNames = [
    //         //{ name: 'Jo', expectedError: 'Name must be at least 3 characters long' },
    //         { name: 'John@Doe', expectedError: 'Name should only contain letters and spaces' },
    //         { name: 'John123', expectedError: 'Name should only contain letters and spaces' },
    //         { name: 'J'.repeat(51), expectedError: 'Name must not exceed 50 characters' }
    //     ];

    //     for (const { name, expectedError } of invalidNames) {
    //         await registrationPage.fillForm({
    //             name: name,
    //             email: `test${Math.random().toString(36).substring(2)}@example.com`,
    //             password: 'Password123!',
    //             confirmPassword: 'Password123!',
    //             role: 'Team Member'
    //         });
    //         await registrationPage.submit();
    //         await expect(registrationPage.page.getByText(expectedError)).toBeVisible();
    //     }
    // });

    test('should handle browser navigation', async () => {
        // Fill form
        await registrationPage.fillForm({
            name: 'John Doe',
            email: `test${Math.random().toString(36).substring(2)}@example.com`,
            password: 'Password123!',
            confirmPassword: 'Password123!',
            role: 'Team Member'
        });

        // Navigate away and back
        await registrationPage.page.goto('https://example.com');
        await registrationPage.page.goBack();
        
        // Verify form is empty
    await expect(registrationPage.page).toHaveURL('https://hackathon-frontend-b6ll.onrender.com/signup');
    });


    // test('should show error for duplicate email registration', async () => {
    //     const email = `test${Math.random().toString(36).substring(2)}@example.com`;
        
    //     // First registration
    //     await registrationPage.fillForm({
    //         name: 'John Doe',
    //         email: email,
    //         password: 'Password123!',
    //         confirmPassword: 'Password123!',
    //         role: 'Team Member'
    //     });
    //     await registrationPage.submit();
    //     await expect(registrationPage.page.getByText(/success|registered|Welcome|Create/i)).toBeVisible();

    //     // Try registering with same email
    //     await registrationPage.goto();
    //     await registrationPage.fillForm({
    //         name: 'Jane Doe',
    //         email: email,
    //         password: 'Password123!',
    //         confirmPassword: 'Password123!',
    //         role: 'Team Member'
    //     });
    //     await registrationPage.submit();
    //     await expect(registrationPage.page.getByText('Email already exists')).toBeVisible();
    // });

    

    


   
}); 