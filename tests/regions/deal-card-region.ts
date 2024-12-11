import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "../pages/base-page";


export class DealCardRegion extends BasePage {
    readonly page: Page;
    readonly firstDealCard: Locator;
    readonly dealCardWishlistButton: Locator;
    readonly dealCardHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.firstDealCard = page.getByTestId(/deal-card/)
            .filter({ has: page.locator(':visible') })
            .first();
        this.dealCardWishlistButton = this.firstDealCard.getByRole('button', { name: 'Wishlist' });
        this.dealCardHeading = this.firstDealCard.getByRole('heading');
    }

    async addFirstDealToWishlist() {
        await this.dealCardWishlistButton.click();
    }

    async getDealCardHeading() {
        return this.dealCardHeading.textContent();
    }

    async openFirstDealCard() {
        return this.firstDealCard.click();
    }
}
