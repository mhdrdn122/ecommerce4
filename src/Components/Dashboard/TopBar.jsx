import React, { useContext, useEffect, useState } from "react";
import "./style-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import Cookis from "cookie-universal";
import { BASEURL, LOGOUT, USER } from "../../Api/api";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WindoeWidth } from "../../Context/WindoeContext";
const TopBar = () => {
  const menu = useContext(Menu);
  const [name, setName] = useState("");
  const navigate = useNavigate();

 
  const windoeSize = useContext(WindoeWidth);

  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  const getUser = async () => {
    const res = await axios
      .get(`${BASEURL}/${USER}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setName(res.data.name);
      });
    return res;
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      await axios
        .get(`${BASEURL}/${LOGOUT}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => navigate("/login"));
    } catch (err) {
      console.log(err);
    }
  };
  // windoeSize
  return (
    <h3 className="top-bar d-flex align-items-center justify-content-between ">
      <div style={{width: "30%"}} className="d-flex justify-content-between  align-items-center  ">
       {
        windoeSize.widthSize > 750 ? (<h1> E-commerce </h1>) : (null)
       }
        <FontAwesomeIcon
          cursor={"pointer"}
          icon={faBars}
          onClick={() => menu.setIsOpen((prev) => !prev)}
        />
      </div>

      <DropdownButton className="d-flex justify-content-end px-2" id="dropdown-basic-button" title={name}>
        <Dropdown.Item  className="p-2" href="#/action-1" onClick={logout}>
          logout
        </Dropdown.Item>
        <Dropdown.Item  className="p-2" href="/">
          Home Page
        </Dropdown.Item>
      </DropdownButton>
    </h3>
  );
};

export default TopBar;
