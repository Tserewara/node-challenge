const express = require("express")
const mysql = require("mysql2")

const con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
  port: 3306
});

const app = express()

const port = 3000

const createTableQuery = `CREATE TABLE IF NOT EXISTS Users (Userid int NOT NULL AUTO_INCREMENT, Name varchar(255) NOT NULL, PRIMARY KEY (Userid));`

const createUserQuery = `INSERT INTO Users (Name) VALUES ('Alvaro');`

const selectUserQuery = `SELECT Userid, name FROM Users WHERE name = 'Alvaro';`


app.get('/', (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query(createTableQuery, function (err, result) {
      if (err) throw err;
      console.log("Success!")
    });
    con.query(createUserQuery, function (err, result) {
      if (err) throw err;
      console.log("Success!")
    });
    con.query(selectUserQuery, function (err, result) {
      if (err) throw err;
      const users = result
      res.write(`<head><meta charset="UTF-8">
    </head>`)
      res.write("<h1>Full Cycle Rocks!<h1>")
      res.write("<h2>Lista de usuários cadastrados</h2>")

      for (let user of users) {
        res.write(`<p>${user.Userid} - ${user.name}</p>`)
      }
      res.send()
    });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})