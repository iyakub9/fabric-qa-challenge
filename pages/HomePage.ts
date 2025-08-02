import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async verifyGlobalNavigation() {
        const menuItems = [
            'Accounts Overview', 'Transfer Funds', 'Bill Pay',
            'Find Transactions', 'Update Contact Info', 'Log Out'
        ];
        for (const item of menuItems) {
            await expect(this.page.locator(`a:has-text("${item}")`)).toBeVisible();
        }
    }
}