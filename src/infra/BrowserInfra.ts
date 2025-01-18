import { Browser, BrowserContext, chromium } from '@playwright/test';

class BrowserInfra {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private static instance: BrowserInfra;

    private constructor() {}

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.context = null;
        }
    }

    async getBrowserContext() {
        if (!this.browser) {
            this.browser = await chromium.launch({
                headless: true
            });
            this.context = await this.browser.newContext();
        }
        return this.context;
    }

    static getInstance(): BrowserInfra {
        if (!BrowserInfra.instance) {
            BrowserInfra.instance = new BrowserInfra();
        }
        return BrowserInfra.instance;
    }

}

export default BrowserInfra;