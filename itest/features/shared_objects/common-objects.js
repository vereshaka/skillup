module.exports = {
    getValue(resultItems, check, resultItemsIndex, element) {
        resultItems[resultItemsIndex].findElement(element).then(element => {
            element.getText().then(value => expect(check).to.be.equal(value));
        });
    }
};
