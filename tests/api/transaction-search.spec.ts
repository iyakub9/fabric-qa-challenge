import { test, request } from '@playwright/test';
import { generateRandomUser } from '../../utils/dataGenerator';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AccountPage } from '../../pages/AccountPage';
import { BillPaymentPage } from '../../pages/BillPaymentPage';
import { verifySearchTransactionsByAmount } from '../../utils/apiHelpers';



test('Find transaction by amount after bill payment (with real API call)', async ({ page, context }) => {
    const user = generateRandomUser();
    const registration = new RegistrationPage(page);
    const account = new AccountPage(page);
    const bill = new BillPaymentPage(page);
    const amount = '150';

    await test.step('Register and create account', async () => {
        await registration.goto();
        await registration.registerUser(user);
        await registration.verifySuccess();
        await account.openNewAccount('SAVINGS');
    });

    const accountNumber = await account.getNewAccountNumber();

    await test.step('Pay bill', async () => {
        await bill.payBill(amount, accountNumber);
        await bill.verifyPaymentSuccess();
    });

    await test.step('Verify search transaction by amount via API', async () => {
        const apiContext = await request.newContext({
            baseURL: 'https://parabank.parasoft.com',
            storageState: await context.storageState()
        });

        await verifySearchTransactionsByAmount(apiContext, accountNumber, amount);
    });
});