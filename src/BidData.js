import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import "./Biddata.css";

function Biddata() {
  const [dataRows, setDataRows] = useState([]);
  useEffect(() => {
    const getData = async () => {
      // console.log("Testing");
      try {
        api
          .getCustomerData()
          .then((res) => {
            // console.log("Res is :", res.data);
            console.log("Customer Bid Data", res.data[0].bids);
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
      {/* <h1>This page will show bid data.</h1> */}
      <Link to="/">
        <button className="goBack">◀ Go Back</button>
      </Link>
    </>
  );
}

export default Biddata;
