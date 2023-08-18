import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/produits");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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
