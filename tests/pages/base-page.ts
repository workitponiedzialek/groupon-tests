import { type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly modal: Locator;
    readonly modalCloseButton: Locator;
    readonly modalHeader: Locator;
    readonly modalAutocomplete: Locator;
    readonly modalAutocompleteOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.getByRole('dialog');
        this.modalCloseButton = this.modal.getByLabel('Close');
        this.modalHeader = this.modal.getByTestId('modal-header');
        this.modalAutocomplete = this.modal.getByTestId('autocomplete-input');
        this.modalAutocompleteOptions = this.page.getByTestId('autocomplete-options-container');
    }

    async closePopups() {
        if (await this.modal.isVisible()) {
            await this.modalCloseButton.click();
            await this.closePopups();
        }
    }
}
