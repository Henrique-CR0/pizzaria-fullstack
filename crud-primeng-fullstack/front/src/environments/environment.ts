// This file can be replaced during build by using the fileReplacements array.
// ng build replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

// Descobre o endereco da API automaticamente. - [Equipe Pizzaria]
// - No Codespaces: troca a porta do front (ex.: 4200) pela 3000 do backend.
// - Rodando local: usa http://localhost:3000/
// Assim ninguem precisa editar este arquivo em cada Codespaces.
function descobrirApiUrl(): string {
  const host = window.location.hostname;
  if (host.endsWith('.app.github.dev')) {
    return 'https://' + host.replace(/-\d+.app.github.dev$/, '-3000.app.github.dev');
  }
  return 'http://localhost:3000/';
}

export const environment = {
  production: false,
  baseUrl: descobrirApiUrl(),
  viaCepUrl: 'https://viacep.com.br/ws'
};

/*
 
For easier debugging in development mode, you can import the following file
to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.*
This import should be commented out in production mode because it will have a negative impact
on performance if an error is thrown.*/
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.