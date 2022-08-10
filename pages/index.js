import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/0/09/Mumbai_Aug_2018_%2843397784544%29.jpg",
//     address: "Mumbai, Maharastra, India",
//     description: "Good hotel",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup Home Page</title>
        <meta name="description" content="Home page of meetup" />
      </Head>
      <MeetupList meetups={props.meetup} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://nayaknishanth:Mongo123@cluster0.vvp5tf0.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetup: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
