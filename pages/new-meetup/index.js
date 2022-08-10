import { useRouter } from "next/router";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";

function NewMeetUpForm() {
  const router = useRouter();
  async function addMeetupHandler(enterMeetUpData) {
    //console.log(enterMeetUpData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta name="description" content="Add your meetup"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetUpForm;
