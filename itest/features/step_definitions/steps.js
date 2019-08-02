module.exports = function () {
    // add a before feature hook
    this.BeforeFeature(function (feature, done) {
        console.log('BeforeFeature: ' + feature.getName());
        done();
    });

    // add an after feature hook
    this.AfterFeature(function (feature, done) {
        console.log('AfterFeature: ' + feature.getName());
        done();
    });

    // add before scenario hook
    this.BeforeScenario(function (scenario, done) {
        console.log('BeforeScenario: ' + scenario.getName());
        done();
    });


    // add after scenario hook
    this.AfterScenario(function (scenario, done) {
        console.log('AfterScenario: ' + scenario.getName());
        done();
    });
};
var producMoveStepsDefinition = function () {
    this.Given(/As ([a-zA-Z0-9]+) I have login into portal/, (username) => page.homePage.login(username, username));
    this.Then(/'(.*)' link is not available/, (cockpitName) => page.homePage.cockpitNotExists(cockpitName));
    this.Then(/'(.*)' link is available/, (cockpitName) => page.homePage.cockpitExists(cockpitName));
    this.Then(/open '(.*)' cockpit/, async (cockpitName) => await page.homePage.openCockpit(cockpitName));
    this.Given(/open '(.*)' widget/, async (widgetName) => await page.HFHSCockpit.openWidget(widgetName));
    this.Given(/add all products founded by '(.*)'/, async (query) => await page.productMoveWidget.addProducts(query, null));
    this.Given(/^specify '(.*)' account founded by '(.*)' for '(\w*)' group$/, (accountId, query, accountType) => page.productMoveWidget.setAccount(accountType, query, accountId));
    this.When(/^'(.*)' is open$/, (stepName) => page.productMoveWidget.openStep(stepName));
    this.Then(/^The following source account should be selected$/, function (table) {
        return page.OrderValidationStep.checkSourceAccount(table);
    });
    this.Then(/^Effective date is '(.*)'$/, (effectiveDate) => page.OrderValidationStep.checkEffectiveDate(effectiveDate));
    this.Then(/^Target account should be$/, (table) => page.OrderValidationStep.checkTargetAccount(table));
};
module.exports = producMoveStepsDefinition;
