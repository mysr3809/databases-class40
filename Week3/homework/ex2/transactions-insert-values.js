import { createConnection } from "mysql";

const con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

con.connect(err => {
  if (err) throw err;
  console.log("Server Connected!");

  con.query(`USE week3`);

  con.query(`INSERT INTO account(balance)
  VALUES (5000),(6000),(7000),(8000),(9000)`);

  con.query(`INSERT INTO account_changes(account_number, amount, change_date, remark) 
  VALUES (100,1500,'2022-12-12', 'rent'),
          (101,2000,'2022-12-11', 'bill'),
          (102,2500,'2022-11-30', 'borrow'),
          (103,3000,'2022-12-09', 'salary');`);

  console.log("Informations added!");

  con.end();
})