import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "./base-page";
import { DealCardRegion } from "../regions/deal-card-region";
import { HeaderRegion } from "../regions/header-region";

export class MainPage extends BasePage {
    header: HeaderRegion;
    dealCard: DealCardRegion;
    readonly page: Page;
    readonly trendingHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = new HeaderRegion(page);
        this.dealCard = new DealCardRegion(page);
        this.trendingHeader = this.page.locator('h1');
    }

    async goto() {
        await this.page.goto('https://groupon.com/', { waitUntil: 'networkidle' });
        await this.closePopups();
    }
}
