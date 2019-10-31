import {
  Before,
  After,
} from 'cypress-cucumber-preprocessor/steps';
import GucciWorld from '../page_objects/common/gucci-world';

const gucciWorld = new GucciWorld();

Before(() => {
  // TODO: do nothing
});

After(() => {
  gucciWorld.reset();
});

export default gucciWorld;
