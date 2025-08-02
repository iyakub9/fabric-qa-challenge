import { test } from '@playwright/test';
import { generateRandomUser } from '../../utils/dataGenerator';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test('User registration and login flow', async ({ page }) => {
    const user = generateRandomUser();
    const registration = new RegistrationPage(page);
    const login = new LoginPage(page);
    const home = new HomePage(page);

    await test.step('Register user', async () => {
        await registration.goto();
        await registration.registerUser(user);
        await registration.verifySuccess();
    });

    await test.step('Log out and login again with same credentials', async () => {
        await login.logOut();
        await login.login(user.username, user.password);
        await login.verifyLoginSuccess();
    });

    await test.step('Verify global navigation menu', async () => {
        await home.verifyGlobalNavigation();
    });
});
