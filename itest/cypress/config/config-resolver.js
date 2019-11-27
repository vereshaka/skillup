
const fs = require('fs-extra');
const path = require('path');

const cypressConfigResolverByFile = (filename) => {
  const pathToConfigFile = path.resolve(__dirname, `${filename}.json`);
  return fs.readJsonSync(pathToConfigFile);
};
const cypressConfigResolver = () => {
  const env = process.env.AQA_ENV || 'cypress';
  console.log('gg', process.env.AQA_ENV)
  console.log(`Started with ${env} configuration`);
  return cypressConfigResolverByFile(env);
};

const log = () => {
  console.log('Link', cypressConfigResolver().portalUrl);
};
log();

module.exports.cypressConfigResolver = cypressConfigResolver;
