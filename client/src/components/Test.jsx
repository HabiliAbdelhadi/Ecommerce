import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Test = () => {
  const [data, setData] = useState([]);
  //   // Helper function to replace double backslashes with forward slashes
  //   const formatImageFilename = (filename) => {
  //     return filename.replace(/\\/g, "/");
  //   };

  useEffect(() => {
    // Create an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("/produits");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function to load data on component mount
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <>
          <p>{`http://localhost:8000/${item.pictures[0].replace(
            "public\\",
            ""
          )}`}</p>
          <div key={item._id}>
            <h3>{item.title}</h3>
            {item.pictures.length > 0 && (
              <img
                src={`http://localhost:8000/${item.pictures[0].replace(
                  "public\\",
                  ""
                )}`}
                alt={item.title}
              />
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default Test;
