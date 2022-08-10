import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function MeetupDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://nayaknishanth:Mongo123@ac-nd94rb7-shard-00-00.vvp5tf0.mongodb.net:27017,ac-nd94rb7-shard-00-01.vvp5tf0.mongodb.net:27017,ac-nd94rb7-shard-00-02.vvp5tf0.mongodb.net:27017/?ssl=true&replicaSet=atlas-6aan8g-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb://nayaknishanth:Mongo123@ac-nd94rb7-shard-00-00.vvp5tf0.mongodb.net:27017,ac-nd94rb7-shard-00-01.vvp5tf0.mongodb.net:27017,ac-nd94rb7-shard-00-02.vvp5tf0.mongodb.net:27017/?ssl=true&replicaSet=atlas-6aan8g-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        title: selectedMeetup.title,
      },
    },
  };
}

export default MeetupDetail;
