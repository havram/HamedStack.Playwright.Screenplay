import { Page, Locator } from "@playwright/test";

export class HomePage {
    constructor(private page: Page) {}
  
    sideBar(): Locator {
      return this.page.locator('app-main-menu-v2-sidebar');
    }
  
    csDigital(): Locator {
      return this.page.locator('app-cs-digital-home-page');
    }

    mainMenuTopbar(): Locator {
        return this.page.locator('app-main-menu-v2-topbar');
    }

    integrationLinkSelector = '[data-cs-override-id="topbar_integrations"] a';
}
