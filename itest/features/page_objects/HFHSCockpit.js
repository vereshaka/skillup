module.exports = {

    async openWidget(widgetName) {
        switch (widgetName) {
            case 'Product Move':
                await page.productMoveWidget.sendFocus();
                break;
            default:
                throw new Error(`Unknown widget "${widgetName}"`);
        }
    },

};
