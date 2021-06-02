import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "./api";
import "./Biddata.css";

function Biddata() {
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
      {/* <h1>This page will show bid data.</h1> */}
      <Link to="/">
        <button className="goBack">◀ Home</button>
      </Link>
    </>
  );
}

export default Biddata;
