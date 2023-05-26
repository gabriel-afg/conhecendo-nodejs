export async function json(req,res) {
  // leitura de streams
  const buffers = []

  for await(const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString()) //transformar para JSON
  }catch {
    req.body = null 
  }

  res.setHeader('Content-Type', 'application/json') //setando os headers

}