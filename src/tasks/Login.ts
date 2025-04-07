import { Task, Actor } from "../screenplay-pattern";
import { Click } from "../interactions/Click";
import { Write } from "../interactions/Write";
import { Navigate } from "../interactions/Navigate"; 
import { WaitFor } from "../interactions/WaitFor";
import { UsePlaywrightPage } from "../playwright-abilities";
import { Locator } from "@playwright/test";

export class Login extends Task {
  constructor(
    private url: string,
    private usernameField: Locator,
    private username: string,
    private passwordField: Locator,
    private password: string,
    private submitButton: Locator
  ) {
    super([
      Navigate.toUrl(url), 
      Write.into(usernameField, username),
      Click.on(submitButton), 
      WaitFor.element(passwordField, 5000), 
      Click.on(passwordField),
      Write.into(passwordField, password),
      Click.on(submitButton)
    ]);
  }

  public async performAs(actor: Actor): Promise<void> {
    await this.attemptInteractionsAs(actor);
    const page = await actor.useAbility(UsePlaywrightPage);
  } 
}
