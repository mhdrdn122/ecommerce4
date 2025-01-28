import React, { useContext, useEffect, useState } from "react";
import "./style-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindoeWidth } from "../../Context/WindoeContext";
import { links } from "./NavLink";
import Cookis from "cookie-universal";
import { BASEURL, USER } from "../../Api/api";
import axios from "axios";

const SideBar = () => {
  const menu = useContext(Menu);
  const windoeSize = useContext(WindoeWidth);
  const cookis = Cookis();
  const token = cookis.get("ecommerce");
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASEURL}/${USER}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="side-bar pt-3"
      style={{
        left: windoeSize.widthSize < 768 ? (menu.isOpen ? "0" : "-500px") : "0",
        width: menu.isOpen ? "fit-content" : "60px",
        display:
          windoeSize.widthSize < 1560
            ? menu.isOpen
              ? "block"
              : "none"
            : "block",
      }}
    >
      {user &&
        links.map((link, key) => {
          return (
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={`${link.path}`}
                style={{
                  width: windoeSize.widthSize > 768 ? "220px" : "fit-content",
                }}
                className="side-bar-link d-flex align-items-center"
              >
                <FontAwesomeIcon icon={link.icon} />
                <p
                  className="p-0 m-0 pl-3 "
                  style={{
                    display: windoeSize.widthSize < 768 ? "none" : "block",
                  }}
                >
                  {link.title}
                </p>
              </NavLink>
            )
          );
        })}
    </div>
  );
};

export default SideBar;
