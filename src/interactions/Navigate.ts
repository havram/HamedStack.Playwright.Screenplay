import { Interaction, Actor } from "../screenplay-pattern";
import { UsePlaywrightPage } from "../playwright-abilities";

export class Navigate extends Interaction {
  private url: string;

  constructor(url: string) {
      super();
      this.url = url;
  }

  static toUrl(url: string): Navigate {
      return new Navigate(url);
  }

  async attemptAs(actor: Actor): Promise<void> {
    let page = await actor.useAbility(UsePlaywrightPage); 
    await page.goto(this.url);
  }
}