export const getPassword = (username) => username;
export const getPortalURL = () => {
  const environment = Cypress.env('environment');
  switch (environment) {
    case 'local':
      return 'https://gucci-portal.k8s.sytoss.intra';
    case 'int':
      return '';
    case 'dev':
      return '';
    default:
      throw new Error(`Unsupported environment. Name: ${environment}`);
  }
};
