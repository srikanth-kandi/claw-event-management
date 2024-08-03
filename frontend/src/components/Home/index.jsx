import { useState, useEffect } from "react";
import apiAuth from "../../../api";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    apiAuth
      .get("api/events")
      .then(({ data }) => {
        console.log(data);
        setEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        <p></p>
      ) : (
        <div className="h-[80vh] flex justify-center items-center">
          <p className="text-white font-bold text-[20px]">No events found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
