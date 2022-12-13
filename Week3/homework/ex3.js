import { createConnection } from "mysql";

const con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

// original function which is vulnerable for sql injection
// function getPopulation(Country, name, code, cb) {
//   con.query(
//     `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
//     function (err, result) {
//       if (err) cb(err);
//       if (result.length == 0) cb(new Error("Not found"));
//       cb(null, result);
//     }
//   );
//   con.end();
// };


//first way to avoid sql injections to use escape method
function getPopulation(Country, name, code, cb) {
  name = con.escape(name);
  code = con.escape(code);
  console.log("name", name, code);
  con.query(
    `SELECT Population FROM ${Country} WHERE Name = '?' and code = '?'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
  con.end();
};

//second way to use question mark in query
// function getPopulation(Country, name, code, cb) {
//   console.log("name", name, code);
//   con.query(
//     `SELECT Population FROM ${Country} WHERE Name = '?' and code = '?'`,
//     function (err, result) {
//       if (err) cb(err);
//       if (result.length == 0) cb(new Error("Not found"));
//       cb(null, result);
//     }
//   );
//   con.end();
// };

getPopulation("Country", "Turkey", "TUR 'OR' 1=1;", (error, result) => { // this values give us whole data for the first function
  if (error) {
    console.log(error);
  }
  console.table(result);
});
