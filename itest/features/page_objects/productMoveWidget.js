module.exports = {

    async sendFocus() {
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(by.xpath('//span[contains(@class, "AddProduct") and @role = "button"]')));
    },

    async addProducts(query, productIds) {
        await driver.findElement(by.xpath('//span[contains(@class, "AddProduct") and @role = "button"]')).click();
        await driver.sleep(1000);
        await driver.findElement(by.xpath('//input[@id = "searchForm_searchInput"]')).sendKeys(query);
        await driver.findElement(by.xpath('//button[@id = "searchForm_searchButton"]')).click();
        await driver.sleep(5000);
        if (productIds) {
            throw new Error('Unsupported case');
        }
        await driver.findElement(by.xpath('//a[@name = "productCountButton"]')).click();
        await driver.sleep(500);
        await driver.findElement(by.xpath('//button[@id = "process-button"]')).click();
        await driver.sleep(2000);
    },

    async setAccount(accountType, query, accountId) {
        const groupElement = await driver.findElement(by.xpath(`//div[@id = "accordion__heading-0"]`));
        expect(groupElement).to.not.be.null;
        await groupElement.click();
        await driver.sleep(500);
        await driver.findElement(by.xpath('//button[@id = "selectAccount_searchButton"]')).click();
        await driver.sleep(1000);
        await driver.findElement(by.xpath('//input[@id = "searchForm_searchInput"]')).sendKeys(query);
        await driver.findElement(by.xpath('//button[@id = "searchForm_searchButton"]')).click();
        await driver.sleep(3000);
        await driver.findElement(by.xpath('(//input[@type="radio"])[1]')).click();
        await driver.findElement(by.xpath('//button[@id = "process-button"]')).click();
        await driver.sleep(3000);
        await driver.findElement(by.xpath('//button[@class = "DropdownBtn"]')).click();
        await driver.sleep(500);
        await driver.findElement(by.xpath(`//div[@role = "presentation" and text() = "${accountId}"]`)).click();
        await driver.sleep(1000);
    },

    async openStep(stepName) {
        await driver.findElement(by.xpath(`//button[@class="NavigationButton"]/span[text() = "Next"]`)).click();
        await driver.sleep(10000);
    },
};
