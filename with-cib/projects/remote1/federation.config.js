const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'remote1',

  exposes: {
    './Component': './projects/remote1/src/app/app.ts',
    './Products': './projects/remote1/src/app/features/products/products.component.ts',
    './PokemonDetails': './projects/remote1/src/app/features/pokemon-details/pokemon-details.component.ts',
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
