import { createConnection } from "mysql";

const con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3"
});

con.connect(err => {
  if (err) throw err;
  console.log("server Connected!");
  try {
    con.query("SET AUTOCOMMIT = 0");
    con.query("START TRANSACTION");
    con.query(`UPDATE account SET balance=balance-1000
    WHERE account_number=101`, (err, result) => {
      if (err) throw err;
      console.log("Account 101 updated!");
    });

    con.query(`UPDATE account SET balance=balance+1000
    WHERE account_number=102`, (err, result) => {
      if (err) throw err;
      console.log("Account 102 updated!");
    });

    con.query(`INSERT INTO account_changes (account_number, amount, change_date, remark) 
        VALUES(101, -1000 , '2022-12-12', 'charity'),
              (102, 1000 , '2022-12-12', 'borrow')
      `);

    con.query(`COMMIT`);
  } catch (error) {
    con.query(`ROLLBACK`);
  }
  con.end();
})