import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";

function useGetCurrentUser() {
 const dispatch = useDispatch();

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        const result = await axios.get("http://localhost:3100/api/auth/current-user", {
          withCredentials: true,
        });
        dispatch(setCurrentUser(result.data));
        console.log(result)
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchUser();
  }, []);

}

export default useGetCurrentUser;