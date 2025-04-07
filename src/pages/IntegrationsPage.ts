import { Page, Locator } from "@playwright/test";

export class IntegrationsPage {
    constructor(private page: Page) {}

    integrationsCatalog(): Locator {
        return this.page.locator('app-integrations');
    }
}

