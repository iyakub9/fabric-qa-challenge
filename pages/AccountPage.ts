import { Page, expect } from '@playwright/test';

export class AccountPage {
    constructor(private page: Page) {}

    async openNewAccount(type = 'SAVINGS') {
        await this.page.click('text=Open New Account');
        await this.page.selectOption('#type', { label: type });
        await this.page.selectOption('#fromAccountId', { index: 0 });
        await this.page.click('input[value="Open New Account"]');
    }

    async getNewAccountNumber(): Promise<string> {
        const locator = this.page.locator('#newAccountId');
        await expect(locator).toBeVisible();
        const accountText = await locator.textContent();
        if (!accountText) {
            throw new Error('Failed to get account number — text content is null');
        }
        return accountText.trim();
    }

    async verifyNewAccountOpened(newAcc: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
        expect(newAcc).toMatch(/^\d{5,}$/);
    }


}