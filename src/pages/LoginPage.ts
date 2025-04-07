import { Page, Locator } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    username(): Locator {
        return this.page.locator('[data-qa-id="login-form-username"] input#username');
    }

    password(): Locator {
        return this.page.locator('[data-qa-id="login-form-password"] input#password');
    }

    submitButton(): Locator {
        return this.page.locator('[data-qa-id="login-form-submit-btn"]');
    }
}
