import { BrowserContext } from '@playwright/test';

import BrowserInfra from './infra/BrowserInfra';

export const getWebpageText = async (url: string, context: BrowserContext) => {
    const page = await context.newPage();
    let text = '';
    try {
        await page.goto(url, { waitUntil: 'networkidle' });
        text = (await page.locator('body').textContent()) || '';
    } catch (error) {
        console.error(`Error fetching webpage text for ${url}:`, error);
    } finally {
        await page.close();
    }
    return text;
};

const getWebpagesText = async (urls: string[]) => {
    const webpagesText: string[] = [];

    const browserInfra = BrowserInfra.getInstance();
    const context = await browserInfra.getBrowserContext();

    if (!context) {
        throw new Error('failed to initialize browser context');
    }

    try {
        const scrapingPromises = urls.map(async (url) => {
            const text = await getWebpageText(url, context);
            webpagesText.push(text);
        });

        // wait for all promises to resolve
        await Promise.all(scrapingPromises);
    } catch (error) {
        console.error('error fetching webpage text:', error);
    }

    return webpagesText;
};

export default getWebpagesText;