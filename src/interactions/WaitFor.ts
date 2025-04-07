import { Interaction, Actor } from "../screenplay-pattern";
import { Locator } from "playwright";

export class WaitFor extends Interaction {
  constructor(private locator: Locator, private timeout: number) {
    super();
    this.locator = locator;
    this.timeout = timeout;
  }

  async attemptAs(_: Actor): Promise<void> {
    await this.locator.waitFor({ state: "visible", timeout: this.timeout });
  }

  static element(locator: Locator, timeout?: number): WaitFor {
    return new WaitFor(locator, timeout ?? 10000);
  }
}
