import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('input[value="Log In"]');
    }

    async logOut() {
        await this.page.click('a:text("Log Out")');
        await expect(this.page.locator('text=Customer Login')).toBeVisible(); // optional validation
    }

    async verifyLoginSuccess() {
        await expect(this.page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
    }
}