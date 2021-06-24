// Produção

export const environment = {
  production: true,
  apiUrl: 'https://algamoney-apie.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp('algamoney-apie.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
