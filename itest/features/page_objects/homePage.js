module.exports = {

    url: 'http://gucci-portal.k8s.sytoss.intra',

    elements: {
        usernameInput: by.xpath('//*[@id=\'username\']'),
        passwordInput: by.xpath('//*[@id=\'password\']'),
        loginButton: by.xpath('//*[@id="kc-login"]'),
        currentUser: by.xpath('//div[@class="user-name"]'),
        cockpitSwitcher: by.xpath('//div[@class="menu-drawer"]'),
    },

    async login(username, password) {
        await helpers.loadPage(page.homePage.url);
        await driver.wait(until.elementsLocated(page.homePage.elements.usernameInput));
        await driver.findElement(page.homePage.elements.usernameInput).sendKeys(username);
        await driver.findElement(page.homePage.elements.passwordInput).sendKeys(password);
        await driver.findElement(page.homePage.elements.loginButton).click();
        await driver.wait(until.elementsLocated(page.homePage.elements.currentUser));
        const currentUser = await driver.findElement(page.homePage.elements.currentUser).getText();
        expect(currentUser).to.equal(username);
    },

    async cockpitExists(cockpitName) {
        const cockpitLink = await driver.findElement(by.xpath(`//a[contains(@class,"nav-link") and contains(text(), "${cockpitName}")]`));
        expect(cockpitLink).to.not.be.null;
    },

    async cockpitNotExists(cockpitName) {
        let error = null;
        try {
            const cockpitLink = await driver.findElement(by.xpath(`//a[contains(@class,"nav-link") and contains(text(), "${cockpitName}")]`));
        } catch (e) {
            error = e;
        }
        expect(error).to.not.be.null;
    },

    async openCockpit(cockpitName) {
        await driver.findElement(page.homePage.elements.cockpitSwitcher).click();
        await driver.sleep(500);
        await driver.findElement(By.xpath(`//a[@class = "nav-link" and contains(text(), "${cockpitName}")]`)).click();
    },
};
