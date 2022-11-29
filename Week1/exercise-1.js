import { createConnection } from 'mysql';
const con = createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const tables = [
  `CREATE TABLE Invitee (
      invitee_no INT,
      invitee_name VARCHAR(50),
      invited_by VARCHAR(50),
      PRIMARY KEY (invitee_no));`,

  `CREATE TABLE Room (
      room_no INT,
      room_name VARCHAR(50), 
      floor_number INT,
      PRIMARY KEY (room_no));`,

  `CREATE TABLE Meeting (
        meeting_no INT, 
        meeting_title VARCHAR(30), 
        starting_time DATETIME, 
        ending_time DATETIME, 
        room_no INT,
        PRIMARY KEY (meeting_no),
        FOREIGN KEY (room_no) REFERENCES Room(room_no));`
];

const datas = [
  // INSERT FOR INVITEE TABLE
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (1, 'mustafa', 'betul');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (2, 'kemal', 'beyza');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (3, 'metin', 'merve');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (4, 'ahmet', 'mehmet');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (5, 'ali', 'ayse');`,

  // INSERT FOR ROOM TABLE
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (1, 'Room kayseri', 2);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (2, 'Room ankara', 3);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (3, 'Room istanbul', 4);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (4, 'Room weesp', 5);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (5, 'Room amsterdam', 1);`,

  // INSERT FOR INVITEE TABLE
  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (1, 'kayseri meeting', '2022-12-18 12:00:00', '2022-12-18 13:00:00', 1);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (2, 'ankara meeting', '2022-12-19 14:00:00', '2022-12-19 15:00:00', 2);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (3, 'istanbul meeting', '2022-12-20 15:00:00', '2022-12-20 16:00:00', 3);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (4, 'weesp meeting', '2022-12-21 16:00:00', '2022-12-21 17:00:00', 4);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (5, 'amsterdam meeting', '2022-12-22 17:00:00', '2022-12-22 18:00:00', 5);`,
];

con.connect((err) => {
  if (err) throw err;
  console.log("Server Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS meetup;", (err, result) => {
    if (err) throw err;
    console.log("Meetup Database created");
  });

  con.query("USE meetup;", (err, result) => {
    if (err) throw err;
    console.log("Database : meetup");
  });

  con.query("DROP TABLE IF EXISTS Invitee, Room, Meeting"); // if tables exist, delete them first

  tables.forEach((table) => { //used forEach to create tables 
    con.query(table, (err, result) => {
      if (err) throw err;
      console.log("Table created");
    });
  });

  datas.forEach((data) => {
    con.query(data, (err, result) => {
      if (err) throw err;
      console.log("Data added");
    });
  });

  con.end();
});


