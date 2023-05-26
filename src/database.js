import fs from 'node:fs/promises'

const databasePath = new URL('../db.json',import.meta.url); // retorna somente o url para aonde o arquivo vai

export class Database {
  #database = {} //# colocar como propriedade privada da database

  constructor() {
    fs.readFile(databasePath, 'utf8')
    .then(data => {
      this.#database = JSON.parse(data);
    })
    .catch (() => {
      this.#persist()
    })
  }

  #persist() { //metodo que vai escrever banco de dados e retronar um arquivo
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        }) //Object.entries - converter um objeto para array
          //toLowerCase - possibilitar a busca se a entrada estiver com caixa alta ou não
          //[key, value] - destruturar o array separando as querys de key e value
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) { // verificar se tem dados na tabela
      this.#database[table].push(data) //Se nao tiver um dado na tabela ele cria
    }else {
      this.#database[table] = [data]
    }
    
    this.#persist();

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1) //splice = remover
      this.#persist()
    }
  }
}