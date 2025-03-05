import { PlaywrightCrawler } from 'crawlee';

export default function upworkCrawler () {
    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            // Wait for the actor cards to render.
            await page.waitForSelector('.collection-block-item');
    
            const categoryTexts: string[] = await page.$$eval('.collection-block-item', (els: Element[]) => {
                // Extract text content from the actor cards
                return els.map((el) => el.textContent || '');
            });
            categoryTexts.forEach((text, i) => {
                console.log(`CATEGORY_${i + 1}: ${text}\n`);
            });
        },
    });
    
    crawler.run(['https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=web%20developer']);
}