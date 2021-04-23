const express = require('express')
const { generateName } = require('./name')

const app = express()
const port = 3000

const db_config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafionode'
}

// Cria tabela caso não exista
const mysql = require('mysql')
const connection = mysql.createConnection(db_config)
let createTable = `create table if not exists people(id int primary key auto_increment,name varchar(255))`;
connection.query(createTable)

// Adiciona um nome toda vez que sobe o servidor
let name = generateName()
const sql = `INSERT INTO people(name) values('${name}')`
connection.query(sql)
connection.end()

//Response
app.get('/', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(db_config)

    let result = connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        let html = '<h1>Full Cycle Rocks!</h1>'
        for (const item in result) {
            html += '<br> - ' + result[item]['name']
        }
        res.send(html)
    });
    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})