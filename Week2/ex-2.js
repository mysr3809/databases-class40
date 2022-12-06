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
  CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT PRIMARY KEY AUTO_INCREMENT,
    paper_title VARCHAR(30),
    conference VARCHAR(30),
    publish_date DATE
  );`);

  con.query(`
  CREATE TABLE IF NOT EXISTS authors_papers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id));
  `);

  con.query(`INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
  ("Mustafa","Amsterdam Uni","1994-04-01", 9,"M",null),
  ("Betul","Amsterdam Uni","1990-04-01", 4,"F",1),
  ("Jan","Utrect Uni","1991-04-01", 1,"M",2),
  ("Rene","Lahey Uni","1992-04-01", 2,"M",1),
  ("Jorien","Kayseri Uni","1993-04-01", 3,"F",3),
  ("Josien","Delft Uni","1994-04-01", 4,"F",3),
  ("Caroline","Den Helder Uni","1997-04-01", 5,"F",1),
  ("Els","berlin Uni","1984-04-01", 6,"F",5),
  ("Juul","Kayseri Uni","1964-04-01", 7,"M",5),
  ("Toon","Paris Uni","1954-04-01", 8,"M",6),
  ("Miriam","Munih Uni","1964-04-01", 9,"F",6),
  ("Zeynep","Amsterdam Uni","1944-04-01", 2,"F",2),
  ("Elif","Ter Apel Uni","1974-04-01", 3,"F",1),
  ("Kemal","Zwolle Uni","1954-04-01", 4,"M",4),
  ("Ali","Delft Uni","1944-04-01", 5,"M",8)
  `);

  con.query(`INSERT INTO research_Papers(paper_title, conference, publish_date)
  VALUES
  ("Paper_Title_1", "Conference_1", "2022-12-01"),
  ("Paper_Title_2", "Conference_2", "2022-12-02"),
  ("Paper_Title_3", "Conference_3", "2022-12-03"),
  ("Paper_Title_4", "Conference_4", "2022-12-04"),
  ("Paper_Title_5", "Conference_5", "2022-12-05"),
  ("Paper_Title_6", "Conference_6", "2022-12-06"),
  ("Paper_Title_7", "Conference_7", "2022-12-07"),
  ("Paper_Title_8", "Conference_8", "2022-12-08"),
  ("Paper_Title_9", "Conference_9", "2022-12-09"),
  ("Paper_Title_10", "Conference_10", "2022-12-10"),
  ("Paper_Title_11", "Conference_11", "2022-12-11"),
  ("Paper_Title_12", "Conference_12", "2022-12-12"),
  ("Paper_Title_13", "Conference_13", "2022-12-13"),
  ("Paper_Title_14", "Conference_14", "2022-12-14"),
  ("Paper_Title_15", "Conference_15", "2022-12-15"),
  ("Paper_Title_16", "Conference_16", "2022-12-16"),
  ("Paper_Title_17", "Conference_17", "2022-12-17"),
  ("Paper_Title_18", "Conference_18", "2022-12-18"),
  ("Paper_Title_19", "Conference_19", "2022-12-19"),
  ("Paper_Title_20", "Conference_20", "2022-12-20"),
  ("Paper_Title_21", "Conference_21", "2022-12-21"),
  ("Paper_Title_22", "Conference_22", "2022-12-22"),
  ("Paper_Title_23", "Conference_23", "2022-12-23"),
  ("Paper_Title_24", "Conference_24", "2022-12-24"),
  ("Paper_Title_25", "Conference_25", "2022-12-25"),
  ("Paper_Title_26", "Conference_26", "2022-12-26"),
  ("Paper_Title_27", "Conference_27", "2022-12-27"),
  ("Paper_Title_28", "Conference_28", "2022-12-28"),
  ("Paper_Title_29", "Conference_29", "2022-12-29"),
  ("Paper_Title_30", "Conference_30", "2022-12-30")
  `)

  con.query(`INSERT authors_papers(author_id, paper_id) 
  VALUES(1,5),(1,22),(2,15),(3,7),(4,18),(4,19),(5,14),(6,13),(6,23),(7,9),(7,11),(8,12),(9,4),(10,18),
  (11,4),(12,3),(13,1),(14,27)
`)



  con.end();
})

// ("Betul","Rotterdam Uni","1990-04-01", 4,"F",3),
//   ("Jan","Utrect Uni","1991-04-01", 1,"M",5),
//   ("Rene","Lahey Uni","1992-04-01", 2,"M",7),
//   ("Jorien","Eindhoven Uni","1993-04-01", 3,"F",5),
//   ("Josien","Delft Uni","1994-04-01", 4,"F",2),
//   ("Caroline","Den Helder Uni","1997-04-01", 5,"F",4),
//   ("Els","berlin Uni","1984-04-01", 6,"F",8),
//   ("Juul","Kayseri Uni","1964-04-01", 7,"M",9),
//   ("Toon","Paris Uni","1954-04-01", 8,"M",6),
//   ("Miriam","Munih Uni","1964-04-01", 9,"F",6),
//   ("Zeynep","Groningen Uni","1944-04-01", 2,"F",7),
//   ("Elif","Ter Apel Uni","1974-04-01", 3,"F",9),
//   ("Kemal","Zwolle Uni","1954-04-01", 4,"M",7),
//   ("Ali","Fortuna Uni","1944-04-01", 5,"M",8)