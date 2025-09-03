const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'remote2',

  exposes: {
    './Component': './projects/remote2/src/app/app.ts',
    './Clients': './projects/remote2/src/app/features/clients/clients.component.ts',
    './Pokedex': './projects/remote2/src/app/features/pokedex/pokedex.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    pokelib: { singleton: true, strictVersion: true, requiredVersion: '0.0.1' }
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
  
});
