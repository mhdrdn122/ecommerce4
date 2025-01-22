import axios from "axios";
import React, { useState } from "react";
import { BASEURL, LOGOUT } from "../../Api/api";
import Cookis from "cookie-universal";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const cookis = Cookis();
  const token = cookis.get("ecommerce");
  const [ loading , setLoading ] = useState(true)


  const navigate = useNavigate();

  const handleLogoutSubmit = async () => {
    try {
      setLoading(false)
      const res = await axios.get(`${BASEURL}/${LOGOUT}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setLoading(true)

      cookis.remove("ecommerce");
      navigate("/login");
    //   console.log(res);
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <button
      style={{ backgroundColor: "#000", color: "#fff" }}
      className="border-0  d-flex flex-column gap-3 lh-1 p-3 btn"
      type="button"
      onClick={handleLogoutSubmit}
    >
      {
        !loading ? "loading..." : "logout"
      }
    </button>
  );
};

export default Logout;
