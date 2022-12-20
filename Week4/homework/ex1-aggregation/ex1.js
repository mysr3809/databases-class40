const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

const getTotalPopulationByYear = async (client, country) => {
  const resPopulation = client
    .db("databaseWeek4")
    .collection("population")
    .aggregate([
      {
        '$match': {
          'Country': country,
        },
      },
      {
        '$group': {
          '_id': "$Year",
          'count_population': {
            '$sum': {
              $sum: ["$F", "$M"],
            },
          },
        },
      },
      {
        '$sort': {
          '_id': 1,
        },
      },
    ]);

  const arr = await resPopulation.toArray();
  console.log(arr);
}

const filteredContinent = async (client, age, year) => {
  const resFilteredContinent = client
    .db("databaseWeek4")
    .collection("population")
    .aggregate(
      [
        {
          '$match': {
            'Country': {
              '$in': [
                'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA', 'AFRICA'
              ]
            },
            'Age': age,
            'Year': year
          }
        }, {
          '$set': {
            'TotalPopulation': {
              '$sum': {
                '$sum': [
                  '$M', '$F'
                ]
              }
            }
          }
        }
      ]
    );
  const arr = await resFilteredContinent.toArray();

  console.table(arr);
}





async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await getTotalPopulationByYear(client, "Turkey");
    await filteredContinent(client, "0-4", 1950);

  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();