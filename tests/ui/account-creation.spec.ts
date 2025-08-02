import { test } from '@playwright/test';
import { generateRandomUser } from '../../utils/dataGenerator';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AccountPage } from '../../pages/AccountPage';

test('Create savings account and capture account number', async ({ page }) => {
    const user = generateRandomUser();
    const registration = new RegistrationPage(page);
    const account = new AccountPage(page);

    await test.step('Register user', async () => {
        await registration.goto();
        await registration.registerUser(user);
        await registration.verifySuccess();
    });

    await test.step('Open new savings account and verify', async () => {
        await account.openNewAccount('SAVINGS');
        const newAcc = await account.getNewAccountNumber();
        await account.verifyNewAccountOpened(newAcc);
    });
});
