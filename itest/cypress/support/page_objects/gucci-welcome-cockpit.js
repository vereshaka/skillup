// @flow

import AbstractCockpit from './common/abstract-cockpit';

class GucciWelcomeCockpit extends AbstractCockpit {
  getName = (): string => 'Welcome';

  getTitle = (): string => 'Welcome';
}

export default GucciWelcomeCockpit;
