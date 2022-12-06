import { createConnection } from 'mysql';

const con = createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: "homework"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Succesfull!");

  con.query(`CREATE TABLE authors(
    author_id INT AUTO_INCREMENT, 
    author_name VARCHAR(30), 
    university VARCHAR(30), 
    date_of_birth DATE, 
    h_index INT, 
    gender ENUM('M', 'F'),
    PRIMARY KEY (author_id)
    )`);

  con.query(`ALTER TABLE authors ADD mentor INT`);
  con.query(`ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`);
  con.end();
})