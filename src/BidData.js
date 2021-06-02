import React from "react";
import { Link } from "react-router-dom";

function BidData() {
  return (
    <>
      <h1>This page will show bid data.</h1>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </>
  );
}

export default BidData;
