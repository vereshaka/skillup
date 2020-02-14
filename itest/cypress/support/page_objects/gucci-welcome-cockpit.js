// @flow

import AbstractCockpit from './common/abstract-cockpit';
import { getValue } from './utils/config';

class GucciWelcomeCockpit extends AbstractCockpit {
  initElements() {
    this.elements = {};
  }

  getName = (): string => 'Welcome';

  getTitle = (): string => getValue('Welcome');
}

export default GucciWelcomeCockpit;
