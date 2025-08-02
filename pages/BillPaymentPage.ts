import { Page, expect } from '@playwright/test';

export class BillPaymentPage {
    constructor(private page: Page) {}

    async payBill(amount: string, fromAccount: string) {
        await this.page.click('text=Bill Pay');
        await this.page.fill('input[name="payee.name"]', 'Electric Company');
        await this.page.fill('input[name="payee.address.street"]', '123 Bill St');
        await this.page.fill('input[name="payee.address.city"]', 'Melbourne');
        await this.page.fill('input[name="payee.address.state"]', 'VIC');
        await this.page.fill('input[name="payee.address.zipCode"]', '3000');
        await this.page.fill('input[name="payee.phoneNumber"]', '0400123456');
        await this.page.fill('input[name="payee.accountNumber"]', '123456');
        await this.page.fill('input[name="verifyAccount"]', '123456');
        await this.page.fill('input[name="amount"]', amount);
        await this.page.selectOption('select[name="fromAccountId"]', fromAccount);
        await this.page.click('input[value="Send Payment"]');
    }

    async verifyPaymentSuccess() {
        await expect(this.page.locator('text=Bill Payment Complete')).toBeVisible();
    }
}