import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "../pages/base-page";


export class HeaderRegion extends BasePage {
    readonly page: Page;
    readonly languageButton: Locator;
    readonly applyNewLanguageButton: Locator;
    readonly locationSearchButton: Locator;
    readonly homeLink: Locator;
    readonly signInButton: Locator;
    readonly recentlyViewedLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.languageButton = this.page.getByRole('button', { name: 'language select' });
        this.applyNewLanguageButton = this.page.getByRole('button', { name: 'Apply' });
        this.locationSearchButton = this.page.getByTestId('location-search-button')
            .filter({ has: page.locator(':visible') });
        this.homeLink = this.page.getByLabel('Home');
        this.signInButton = this.page.locator('[data-bhw="signin-btn"]');
        this.recentlyViewedLink = this.page.getByRole('link', { name: 'Recently Viewed' });
    }

    async changeLanguage(newLanguage) {
        await this.languageButton.click();
        await this.page.getByRole('radio', { name: newLanguage }).check();
        await this.applyNewLanguageButton.click();
    }

    async changeLocation(newLocation) {
        await this.locationSearchButton.click();
        await this.modalAutocomplete.fill(newLocation);
        await this.modalAutocompleteOptions.getByRole('button', { name: newLocation, exact: true }).click();
    }

    async openRecentlyViewedPage() {
        await this.signInButton.click();
        await this.recentlyViewedLink.click();
    }

    async goToHomePage() {
        await this.homeLink.click();
    }
}
