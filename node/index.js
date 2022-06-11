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


let peoples = []


app.get('/', (req,res) => {
  const connection = createConnection(config)

  connection.connect(() => {
    console.log('Connected in database.')
  })

  connection.query(`
    CREATE TABLE IF NOT EXISTS people(
      ID INT NOT NULL AUTO_INCREMENT, 
      NAME VARCHAR(50) NOT NULL,
      PRIMARY KEY (ID)
    )
  `)

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

  connection.query(`SELECT * FROM people;`, (err, resp) => {
    if (err) {
      console.error(err)
      return
    }

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${resp.map(people => `<li>${people.NAME}</li>`)}
      </ul>
    `)
  })
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})
