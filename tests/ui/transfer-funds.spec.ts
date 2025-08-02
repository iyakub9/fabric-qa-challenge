import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AccountPage } from '../../pages/AccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { generateRandomUser } from '../../utils/dataGenerator';

test('Transfer funds between accounts', async ({ page }) => {
    const user = generateRandomUser();
    const registration = new RegistrationPage(page);
    const account = new AccountPage(page);
    const transfer = new TransferFundsPage(page);

    await test.step('Register and open account', async () => {
        await registration.goto();
        await registration.registerUser(user);
        await account.openNewAccount('SAVINGS');
    });

    const fromAccount = await account.getNewAccountNumber();
    const transferAmount = '100';

    await test.step('Transfer funds and verify', async () => {
        await transfer.transferFunds(transferAmount, fromAccount);
        await transfer.verifyTransferSuccess();
    });
});
