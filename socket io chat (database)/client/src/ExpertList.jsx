import React, { useEffect, useState } from "react";

function ExpertList() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    // Fetch experts data from your Express API
    fetch("http://localhost:3001/api/experts") // Update the URL with your API endpoint
      .then((response) => response.json())
      .then((data) => setExperts(data))
      .catch((error) => console.error("Error fetching experts:", error));
  }, []);

  return (
    <div>
      <h2>Expert List</h2>
      <div>
        {experts.map((expert) => (
          <button key={expert._id}>{expert.username}</button>
        ))}
      </div>
    </div>
  );
}

export default ExpertList;
