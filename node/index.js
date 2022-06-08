const { createConnection } = require('mysql')
const express = require('express')
const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
}

const connection = createConnection(config)

let peoples = []

connection.connect(() => {
  createTable()

  console.log('Connected in database.')
})

function createTable(params) {
  connection.query(`
    CREATE TABLE IF NOT EXISTS people(
      ID INT NOT NULL AUTO_INCREMENT, 
      NAME VARCHAR(50) NOT NULL,
      PRIMARY KEY (ID)
    )
  `)
}

app.get('/', (req,res) => {
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${peoples.map(people => `<li>${people.name}</li>`)}
    </ul>
  `)
})

app.listen(port, ()=> {
  connection.query(`
    INSERT INTO people(name)
    VALUES
      ("Thiago"),
      ("Thaina"),
      ("Kamilla");
  `, (err, resp) => {
    if (err) {
      console.error(err)
      return
    }
    return
  })

  connection.query(`
    SELECT * FROM people;
  `, (err, resp) => {
    if (err) {
      console.error(err)
      return
    }

    resp.forEach(people => {
      peoples.push({ name: people.NAME })
    })
    return
  })

  console.log('Rodando na porta ' + port)
})
