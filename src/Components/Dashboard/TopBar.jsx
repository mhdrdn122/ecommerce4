import React, { useContext, useEffect, useState } from "react";
import "./style-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import Cookis from "cookie-universal";
import { BASEURL, LOGOUT, USER } from "../../Api/api";
import axios from "axios";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
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
    try {
      const res = await axios.get(`${BASEURL}/${USER}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setName(res.data.name);
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
    }
  };

  const toggleMenu = () => {
    menu.setIsOpen((prev) => !prev);
  };

  return (
    <h3 className="top-bar d-flex align-items-center justify-content-between">
      <div
        style={{ width: "35%" }}
        className="d-flex justify-content-between align-items-center"
      >
        {windoeSize.widthSize > 750 ? <h1>E-commerce</h1> : null}
        <Button variant="light" className="bg-light" onClick={toggleMenu}>
          <FontAwesomeIcon cursor={"pointer"} icon={faBars} />
        </Button>
      </div>

      <DropdownButton
        className="d-flex justify-content-end px-2"
        id="dropdown-basic-button"
        title={name}
      >
        <Dropdown.Item className="p-2" onClick={logout}>
          logout
        </Dropdown.Item>
        <Dropdown.Item className="p-2" href="/">
          Home Page
        </Dropdown.Item>
      </DropdownButton>
    </h3>
  );
};

export default TopBar;
