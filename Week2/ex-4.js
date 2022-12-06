import { createConnection } from "mysql";

const con = createConnection((err) => {
  if (err) throw err;
  console.log("Succesfull!");

  //1. All research papers and the number of authors that wrote that paper.
  con.query(` 
    SELECT research_Papers.paper_title, COUNT(research_Papers.paper_title) FROM authors
    JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    JOIN research_Papers
    ON authors_papers.paper_id=research_Papers.paper_id
    GROUP BY research_Papers.paper_title;
`);

  //2. Sum of the research papers published by all female authors.
  con.query(`
    SELECT gender, COUNT(research_Papers.paper_title)
    FROM authors
	  LEFT JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    LEFT JOIN research_Papers
    ON authors_papers.paper_id=research_Papers.paper_id
    WHERE gender="F";`);

  //3. Average of the h-index of all authors per university.
  con.query(`
    SELECT university, AVG(h_index) 
    FROM authors
    GROUP BY university;
  `);

  //4. Sum of the research papers of the authors per university.
  con.query(`
    SELECT authors.university,COUNT(authors_papers.paper_id) FROM authors
    LEFT JOIN authors_papers
    ON authors.author_id=authors_papers.author_id
    GROUP BY authors.university;
  `);

  //5. Minimum and maximum of the h-index of all authors per university.*/
  con.query(`
    SELECT university, MAX(h_index) AS MAX_value, MIN(h_index) AS MIN_value
    FROM authors 
    GROUP BY university;
  `);

  con.end();
})