import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AccountPage } from '../../pages/AccountPage';
import { BillPaymentPage } from '../../pages/BillPaymentPage';
import { generateRandomUser } from '../../utils/dataGenerator';

test('Pay bill using newly created account', async ({ page }) => {
    const user = generateRandomUser();
    const registration = new RegistrationPage(page);
    const account = new AccountPage(page);
    const bill = new BillPaymentPage(page);

    await test.step('Register and open account', async () => {
        await registration.goto();
        await registration.registerUser(user);
        await account.openNewAccount('SAVINGS');
    });

    const newAccount = await account.getNewAccountNumber();

    await test.step('Pay bill and verify', async () => {
        await bill.payBill('100', newAccount);
        await bill.verifyPaymentSuccess();
    });
});
