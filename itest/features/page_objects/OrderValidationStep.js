module.exports = {

    async checkSourceAccount(table) {
        let result = [];
        const accounts = await driver.findElements(By.xpath('//div[@class="ProductSection Info"]'));
        for (account of accounts) {
            async (account) => (
                result.push({
                    Product: await account.findElement('/div[@class="ProductItemMove"]/div/div/a[@href="#selectProductName"]').getText(),
                    Subscription: await account.findElement('/div[@class="ProductItemMove"]/div/div/span[1]').getText(),
                    AccountNumber: await account.findElement('/div[@class="ProductItemMove"]/div/span[2]').getText(),
                    AccountType: await account.findElement('/div[@class="ProductItemMove"]/div/span[3]').getText(),
                }));
        }
        ;
        console.log(JSON.stringify(result));
        expect(result).to.be.equal(result, table.hashes);
    },
    async checkEffectiveDate(effectiveDate) {

    },
    async checkTargetAccount(table) {

    },

};
