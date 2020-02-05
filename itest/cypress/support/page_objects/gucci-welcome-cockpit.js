// @flow

import AbstractCockpit from './common/abstract-cockpit';

class GucciWelcomeCockpit extends AbstractCockpit {
  initElements() {
    this.elements = {};
  }

  getName = (): string => 'Welcome';

  getTitle = (): string => 'Welcome';
}

export default GucciWelcomeCockpit;
