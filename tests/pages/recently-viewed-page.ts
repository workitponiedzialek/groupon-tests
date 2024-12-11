import { type Locator, type Page} from '@playwright/test';
import { BasePage } from "./base-page";
import { DealCardRegion } from "../regions/deal-card-region";
import { HeaderRegion } from "../regions/header-region";

export class RecentlyViewedPage extends BasePage {
    header: HeaderRegion;
    dealCard: DealCardRegion;
    readonly page: Page;
    readonly recentlyViewedList: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.header = new HeaderRegion(page);
        this.dealCard = new DealCardRegion(page);
        this.recentlyViewedList = this.page.locator('[data-bhw-path="Page-RecentlyViewedDeals|DealCardList"]');
    }
}
