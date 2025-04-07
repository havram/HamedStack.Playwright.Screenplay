import { UsePlaywrightPage } from "../playwright-abilities";
import { Interaction, Actor } from "../screenplay-pattern";
import { Locator } from "playwright";

export class Click extends Interaction {
    private locator?: Locator;
    private isShadowClick: boolean = false;
    private shadowHost?: Locator;
    private shadowSelector?: string;

    constructor(locatorOrHost?: Locator, isShadowClick = false, shadowSelector?: string) {
        super();
        if (isShadowClick) {
          this.shadowHost = locatorOrHost;
          this.shadowSelector = shadowSelector;
          this.isShadowClick = true;
        } else {
          this.locator = locatorOrHost;
        }
    }

    static on(locator: Locator): Click {
        return new Click(locator);
    }

    static insideShadow(host: Locator, shadowSelector: string): Click {
      return new Click(host, true, shadowSelector);
    }
    
    async attemptAs(actor: Actor): Promise<void> {
      if (this.isShadowClick && this.shadowHost && this.shadowSelector) {
        const page = await actor.useAbility(UsePlaywrightPage); 
        const elementHandle = await this.shadowHost.elementHandle();
        if (!elementHandle) throw new Error("Shadow host not found");
  
        const shadowRoot = await elementHandle.evaluateHandle(el => (el as any).shadowRoot);
        const target = await shadowRoot.evaluateHandle((root, selector) => root.querySelector(selector), this.shadowSelector);
  
        if (!target) throw new Error(`Element '${this.shadowSelector}' not found inside shadow DOM`);
  
        await target.asElement()?.waitForElementState("visible");
        await target.asElement()?.click();
      } else if (this.locator) {
        await this.locator.waitFor({ state: "visible" });
        await this.locator.click();
      }
    }
  }