// @flow
class AbstractWidget {
  elements: Map<string, string>;

  constructor() {
    this.elements = {
      ONE: 'one',
      TWO: 'two',
    };
  }

  getElements = () => this.elements
}

export default AbstractWidget;
