import { createConnection } from "mysql";

const con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

con.connect(err => {
  if (err) throw err;
  console.log("Server connected!");

  con.query("DROP DATABASE IF EXISTS week3", (err, result) => {
    if (err) throw err;
    console.log("week3 dropped!");
  });

  con.query("CREATE DATABASE week3", (err, result) => {
    if (err) throw err;
    console.log("week3 created!");
  });

  con.query("USE week3", (err, result) => {
    if (err) throw err;
    console.log("week3 using!");
  });

  con.query(`CREATE TABLE account(
    account_number INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    balance INT
  )`, (err, result) => {
    if (err) throw err;
    console.log("account table created!");
  });

  con.query(`ALTER TABLE account AUTO_INCREMENT = 100`)

  con.query(`CREATE TABLE account_changes(
    change_number INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    account_number INT NOT NULL,
    amount INT NOT NULL,
    change_date DATE NOT NULL,
    remark VARCHAR(128) NOT NULL,
    FOREIGN KEY (account_number) REFERENCES account (account_number)
  )`, (err, result) => {
    if (err) throw err;
    console.log("account_changes table created!");
  });

  con.end();
})