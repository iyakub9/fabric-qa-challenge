import { Page, expect } from '@playwright/test';

export class TransferFundsPage {
    constructor(private page: Page) {}

    async transferFunds(amount: string, fromAccount?: string, toAccount?: string) {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            this.page.click('text=Transfer Funds'),
        ]);
        await this.page.fill('input[id="amount"]', amount);
        await this.page.selectOption('#fromAccountId', fromAccount || { index: 0 });
        await this.page.selectOption('#toAccountId', toAccount || { index: 0 });
        await this.page.click('input[value="Transfer"]');
    }

    async verifyTransferSuccess() {
        await expect(this.page.locator('text=Transfer Complete!')).toBeVisible();
    }
}