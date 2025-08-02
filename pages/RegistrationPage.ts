import { Page, expect } from '@playwright/test';

export class RegistrationPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/parabank/register.htm');
    }

    async registerUser(user: any) {
        await this.page.fill('input[name="customer.firstName"]', user.firstName);
        await this.page.fill('input[name="customer.lastName"]', user.lastName);
        await this.page.fill('input[name="customer.address.street"]', user.address);
        await this.page.fill('input[name="customer.address.city"]', user.city);
        await this.page.fill('input[name="customer.address.state"]', user.state);
        await this.page.fill('input[name="customer.address.zipCode"]', user.zipCode);
        await this.page.fill('input[name="customer.phoneNumber"]', user.phone);
        await this.page.fill('input[name="customer.ssn"]', user.ssn);
        await this.page.fill('input[name="customer.username"]', user.username);
        await this.page.fill('input[name="customer.password"]', user.password);
        await this.page.fill('input[name="repeatedPassword"]', user.password);
        await this.page.click('input[value="Register"]');
    }

    async verifySuccess() {
        await expect(this.page.locator('text=Your account was created successfully. You are now logged in.')).toBeVisible();
    }
}
