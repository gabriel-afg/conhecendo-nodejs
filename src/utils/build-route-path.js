// /users/:id
//regex = expressao regular encontrar texto com formato especifico
//path - retorna uma string com o caminho da url
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') 
  // $1 - pegas todos os valores dos grupos na url

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) 

  return pathRegex
}