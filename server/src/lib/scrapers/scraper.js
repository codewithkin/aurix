import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
    maxConcurrency: 2,
    launchContext: {
        launchOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
    },
});

export default crawler;