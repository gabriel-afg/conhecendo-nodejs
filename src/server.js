import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { exctractQueryParams } from './middlewares/extract-query-params.js'

// Stateful - aplicação que guarda recursos na memoria / Stateless - depende de banco de dados

//Query Parameters : URL Stateful => Filtros, paginação, não-obrigatorios
//Route Parameters : Indentificação de recurso
//Request Body: Envio de infromações de um formulario (https)

// http://localhost:3333/users?userid=1&name=Diego
// GET http://localhost:3333/users/1

const server = http.createServer(async(req,res) => {
  const {method, url} = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params// colocar req.params para o id passar pelo req para o routes
    req.query = query ? exctractQueryParams(query) : {}

    return route.handler(req, res)
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)