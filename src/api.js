/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  getCustomerData: () =>
    axios({
      method: "GET",
      url: `https://intense-tor-76305.herokuapp.com/merchants`,
    }),
};
