import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "./api";
// import "./Test.css";

function Test() {
  const [dataRows, setDataRows] = useState([]);

  const customerId = useParams();
  //   console.log(useParams);
  const custId = Object.values(customerId).toString();
  //   console.log("Id is :", typeof custId);

  useEffect(() => {
    const getData = async () => {
      // console.log("Testing");
      try {
        api
          .getBIdData(custId)
          .then((res) => {
            // console.log("Res is :", res.data);
            console.log("Customer Bid Data", res.data.bids);
            let customerData = res.data;
            setDataRows(customerData);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Link to="/">
        <button className="goBack">◀ Home</button>
      </Link>
      <h1>This is bider</h1>
    </>
  );
}

export default Test;

// line 243

// LINE 46 COMMENT
