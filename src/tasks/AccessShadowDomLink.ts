import { Task, Actor } from "../screenplay-pattern";
import { Click } from "../interactions/Click";
import { WaitFor } from "../interactions/WaitFor";
import { UsePlaywrightPage } from "../playwright-abilities";
import { Locator } from "playwright";

export class AccessShadowDomLink extends Task {
  constructor(
    private shadowHost: Locator,
    private integrationLinkSelector: string,
    private integrationsCatalog : Locator
  ) {
    super([
        Click.insideShadow(shadowHost, integrationLinkSelector),
        WaitFor.element(integrationsCatalog)
    ]);
  }

  public async performAs(actor: Actor): Promise<void> {
    await this.attemptInteractionsAs(actor);
    const page = await actor.useAbility(UsePlaywrightPage);
  } 
}
