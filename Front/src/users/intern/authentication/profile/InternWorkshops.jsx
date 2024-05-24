import React, { useState } from "react";

function InternWorkshops() {
  const [workshops] = useState([
    {
      _id: "1",
      title: "Introduction to React",
      description:
        "Learn the basics of React, a popular JavaScript library for building user interfaces.",
      date: "2024-06-01",
      link :"https://meet.google.com/kri-damu-zte ",
    },
  ]);

  const joinWorkshop = (workshopId) => {
    console.log(`Joining workshop with ID: ${workshopId}`);
  };

  return (
    <div>
      <b>Workshops</b>
      <ul>
        {workshops.map((workshop) => (
          <li key={workshop._id}>
            <div className="pt-3">{workshop.title}</div>
            <div className="pt-3">{workshop.description}</div>
            <div className="pt-3">{workshop.date}</div>
            <b className="pt-10">{workshop.link}</b>
            <button
              className=" mt-6 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => joinWorkshop(workshop._id)}>
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternWorkshops;
