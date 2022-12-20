import dotenv from "dotenv";
dotenv.config();

export const transfer = async (client, sender, receiver, amount, remark) => {

  const session = await client.startSession();
  try {
    await client.startSession().withTransaction(async () => {
      await client.db('databaseWeek4').collection('account').updateOne(
        { account_number: sender },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: 2,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },

        { session }
      );

      await client.db('databaseWeek4').collection('account').updateOne(
        { account_number: receiver },
        {
          $inc: { balance: +amount },
          $push: {
            account_changes: {
              change_number: 2,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },

        { session }
      );
    });
    console.log(`${amount} euro transferred from ${sender} to ${receiver}`);
  } finally {
    await session.endSession();
  }
};


