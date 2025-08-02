import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './tests',
    retries: process.env.CI ? 2 : 1,
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    workers: 5,
    timeout: 30000,
    use: {
        baseURL: 'https://parabank.parasoft.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'Chrome',
            use: { ...devices['Desktop Chrome'] },
        }
    ]
});
