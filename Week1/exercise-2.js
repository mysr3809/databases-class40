import { createConnection } from 'mysql';
const con = createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});


const allQueries = [
  `SELECT name, population
    FROM country 
    WHERE population > 8000000;`,

  `SELECT name 
    FROM country 
    WHERE name LIKE '%land%';`,

  `SELECT name, population
    FROM city 
    WHERE population BETWEEN 500000 AND 1000000;`,

  `SELECT name 
    FROM country 
    WHERE continent = 'Europe';`,

  `SELECT name 
    FROM country 
    ORDER BY surfaceArea DESC;`,

  `SELECT name
    FROM city 
    WHERE countryCode = 'NLD';`,

  `SELECT name, population 
    FROM city 
    WHERE name = 'Rotterdam';`,

  `SELECT name, surfaceArea
    FROM country
    ORDER BY surfaceArea DESC LIMIT 10;`,

  `SELECT name, population
    FROM city 
    ORDER BY population DESC LIMIT 10;`,

  `SELECT SUM (population) 
    FROM country;`,
];

con.connect((err) => {
  if (err) throw err;
  console.log("Server Connected");
  con.query("USE new_world;", (err, result) => { // to select database
    if (err) throw err;
    console.log("Database : new_world");
  });

  allQueries.forEach((query) => {
    con.query(query, (err, result) => { // to avoid repeated code, used forEach
      if (err) throw err;
      console.log("QUERY : ", query);
      console.log(result);
    });
  });

  con.end();
});