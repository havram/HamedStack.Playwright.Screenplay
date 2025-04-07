import { Actor, Question } from "../screenplay-pattern";
import { Locator } from "playwright";

export class Visible extends Question {
    private locator: Locator;

    constructor(locator: Locator) { 
        super();
        this.locator = locator;
    }

    static element(locator: Locator): Visible {
        return new Visible(locator);
    }

    async askAs(_: Actor): Promise<boolean> {
        try {
            await this.locator.waitFor({ state: "attached", timeout: 10000 });
            return await this.locator.isVisible();
          } catch {
            return false;
          }
    }
}
