import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { items } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={items}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch(
    "https://api.manoapp.com/api/v1/users/products/whats_new",
    {
      method: "GET",
      headers: {
        StoreID: "4",
        Authorization: "f44a4aabfc5992514d262d7f517327e7",
        UserAddressID: " 60877",
      },
    }
  );

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData.data.items;
  }
}

export function loader() {
  return defer({
    items: loadEvents(),
  });
}
