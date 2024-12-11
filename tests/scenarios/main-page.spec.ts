import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { RecentlyViewedPage } from "../pages/recently-viewed-page";

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
});

test('should require log in on wishlisting deal', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.dealCard.addFirstDealToWishlist();

    await expect(mainPage.modalHeader).toHaveText('Sign in to add the deal to your wishlist');
});

test('should change language to Spanish', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.header.changeLanguage('ESP');

    await expect(mainPage.trendingHeader).toContainText('Tendencias de hoy en', {
        timeout: 10000,
    });
});

test('should change location to Washington', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.header.changeLocation('Washington, D.C., USA');

    await expect(mainPage.trendingHeader).toContainText('Washington, D.C., USA');
    await expect(mainPage.header.locationSearchButton).toContainText('Washington, D.C., USA');
});

test('should show deal in Recently Viewed', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.header.openRecentlyViewedPage();
    await page.waitForLoadState('networkidle');
    const recentlyViewedPage = new RecentlyViewedPage(page);

    await expect(recentlyViewedPage.recentlyViewedList).not.toBeVisible();

    await recentlyViewedPage.header.goToHomePage();
    const dealTitle = await mainPage.dealCard.getDealCardHeading();
    await mainPage.dealCard.openFirstDealCard();
    await mainPage.header.openRecentlyViewedPage();

    await expect(recentlyViewedPage.recentlyViewedList).toBeVisible();
    await expect(recentlyViewedPage.dealCard.dealCardHeading).toHaveText(dealTitle);
});
