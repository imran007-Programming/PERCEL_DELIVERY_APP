import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useUserInfoQuery } from "../Redux/Features/Auth/auth.api";

export const CustomerId = () => {
  const { data } = useUserInfoQuery(undefined);
  const [customerId, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const userId = data?.data?._id;
  const userName = data?.data?.name;

 

  useEffect(() => {
    if (data) {
      setCustomerID(userId);
      setCustomerName(userName);
    } else {
      //guest user
      let id = localStorage.getItem("guestId");
      if (!id) {
        id = uuidv4();
        localStorage.setItem("guestId", id);
      }
      setCustomerID(id);
      setCustomerName("Guest");
    }
  }, [data,userId,userName]);
  return { customerId, customerName };
};
