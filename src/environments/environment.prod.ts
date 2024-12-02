export const environment:Environment = {
  production: true,
  apiUrl: 'https://pagamento-carnes-production.up.railway.app/',
  relativePath: null
};


interface Environment {
  production:boolean,
  apiUrl:string,
  relativePath:string|null
}