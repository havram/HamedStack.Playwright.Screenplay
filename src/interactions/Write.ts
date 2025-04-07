import { Interaction, Actor } from "../screenplay-pattern";
import { Locator } from "playwright";

export class Write extends Interaction {
  constructor(private locator: Locator, private text: string) {
    super();
  }

  async attemptAs(_: Actor): Promise<void> {
    await this.locator.fill(this.text);
  }

  static into(locator: Locator, text: string): Write {
    return new Write(locator, text);
  }
}
