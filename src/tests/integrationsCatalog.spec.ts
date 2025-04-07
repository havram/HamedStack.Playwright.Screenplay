import { expect, test } from "@playwright/test";
import { Actor } from "../screenplay-pattern";
import { UsePlaywrightPage } from "../playwright-abilities";
import { Login } from "../tasks/Login";
import { Visible } from "../questions/Visible";

import { URLs } from "../constants/urls";
import { Credentials } from "../constants/credentials";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { WaitFor } from "../interactions/WaitFor";
import { AccessShadowDomLink } from "../tasks/AccessShadowDomLink";
import { IntegrationsPage } from "../pages/IntegrationsPage";

test('Customer admin can access Integrations catalog', async ({ page }) => {
    const pw = new UsePlaywrightPage(page);
    let user = new Actor([pw]); 

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const integrationsPage = new IntegrationsPage(page);
  
    await user.performs(new Login(
        URLs.csq.staging,
        loginPage.username(),
        Credentials.csqStaging.customerAdminUser,
        loginPage.password(), 
        Credentials.csqStaging.customerAdminPassword,
        loginPage.submitButton()
    )); 

    await user.performs(WaitFor.element(homePage.csDigital()));
    await user.performs(WaitFor.element(homePage.sideBar()));
   
    let homePageIsVisible = await user.asksAbout(Visible.element(homePage.csDigital()));
    let sideBarIsVisible = await user.asksAbout(Visible.element(homePage.sideBar())); 
    expect(homePageIsVisible).toBe(true);
    expect(sideBarIsVisible).toBe(true);

    await user.performs(new AccessShadowDomLink(
        homePage.mainMenuTopbar(),
        homePage.integrationLinkSelector,
        integrationsPage.integrationsCatalog()
    ));
    
    let integrationsCatalogIsVisible = await user.asksAbout(Visible.element(integrationsPage.integrationsCatalog()));
    expect(integrationsCatalogIsVisible).toBe(true);    
  });