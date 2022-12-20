import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


export const createAccountCollection = async (client) => {

  await client.db("databaseWeek4").collection("account")
    .deleteMany({});

  await client
    .db("databaseWeek4")
    .collection("account")
    .insertMany([
      {
        account_number: 101,
        balance: 500,
        account_changes: [{
          change_number: 1,
          amount: 100,
          change_date: "2022-12-20",
          remark: "rent"
        }]
      },
      {
        account_number: 102,
        balance: 1000,
        account_changes: [{
          change_number: 1,
          amount: 300,
          change_date: "2022-12-22",
          remark: "insurance"
        }]
      }, {
        account_number: 103,
        balance: 3500,
        account_changes: [{
          change_number: 1,
          amount: 500,
          change_date: "2022-12-23",
          remark: "holiday"
        }]
      }, {
        account_number: 104,
        balance: 5500,
        account_changes: [{
          change_number: 1,
          amount: 2000,
          change_date: "2022-12-25",
          remark: "wedding"
        }]
      }, {
        account_number: 105,
        balance: 7500,
        account_changes: [{
          change_number: 1,
          amount: 4000,
          change_date: "2022-12-27",
          remark: "newCar"
        }]
      }
    ])

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
    console.log("Connected!"),
      await createAccountCollection(client);

  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();