import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://nayaknishanth:Mongo123@cluster0.vvp5tf0.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const results = await meetupsCollection.insertOne(data);

    console.log(results);
    client.close();

    res.status(201).json({ message: "Inserted!!.." });
  }
}

export default handler;
