// import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";

import classes from "./EventsList.module.css";
import { useState } from "react";
import BackDrop from "./BackDrop";
function EventsList({ events }) {
  // const events = useLoaderData();
  const [show, setshows] = useState(false);
  function showHandler() {
    setshows((prev) => !prev);
    console.log("run");
  }
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list} onFocus={showHandler}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img
                src={event.categories[0].images[0].large}
                alt={event.title}
              />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {show && <BackDrop show={show} />}
    </div>
  );
}

export default EventsList;
