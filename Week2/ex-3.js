import { createConnection } from "mysql";
const con = createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: "homework"
})

con.connect((err) => {
  if (err) throw err;
  console.log("Succesfull!");

  con.query(`
      SELECT t1.author_name , t2.author_name
      FROM authors AS t1
      JOIN authors AS t2
      ON t1.author_id=t2.mentor;`);

  con.query(`
      SELECT author_name,paper_title FROM authors
      LEFT JOIN authors_papers
      ON authors.author_id=authors_papers.author_id
      LEFT JOIN  research_Papers
      ON authors_papers.paper_id=research_Papers.paper_id;`);

  con.end();

});
