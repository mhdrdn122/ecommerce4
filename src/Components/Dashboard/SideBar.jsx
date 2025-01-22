import React, { useContext, useEffect, useState } from "react";
import "./style-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindoeWidth } from "../../Context/WindoeContext";
import { links } from "./NavLink";
import Cookis from "cookie-universal";
import { BASEURL, USER } from "../../Api/api";
import axios from "axios";

const SideBar = () => {
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
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const menu = useContext(Menu);
  const windoeSize = useContext(WindoeWidth);
  console.log(windoeSize);
  console.log(menu.isOpen);

  return (
    <div
      className="side-bar pt-3"
      style={{
        left: windoeSize.widthSize < 768 ? (menu.isOpen ? "0" : "-500px") : "0",
        width:
          windoeSize.widthSize < 768
            ? menu.isOpen
              ? "60px"
              : "fit-content"
            : "240px",
        display:
          windoeSize.widthSize < 1560
            ? menu.isOpen
              ? menu.setIsOpen(prev => !prev)
              : "none"
            : "block",
      }}
    >
      {/* <NavLink to="users" className="side-bar-link  d-flex align-items-center">
        <FontAwesomeIcon icon={faUsers} />
        <p className='p-0 m-0 pl-3' style={{
          display : menu.isOpen ? "block" : "none"
        }}>user</p>
       </NavLink>

       <NavLink to="add-user" className="side-bar-link  d-flex align-items-center">
        <FontAwesomeIcon icon={faPlus} />
        <p className='p-0 m-0 pl-3' style={{
          display : menu.isOpen ? "block" : "none"
        }}>Add User</p>
       </NavLink>

       <NavLink to="writer" className="side-bar-link  d-flex align-items-center">
        <FontAwesomeIcon icon={faPlus} />
        <p className='p-0 m-0 pl-3' style={{
          display : menu.isOpen ? "block" : "none"
        }}>Writer</p>
       </NavLink> */}

      {user &&
        links.map((link, key) => {
          return (
            link.role.includes(user.role) && (
              <>
                <NavLink
                  key={key}
                  to={`${link.path}`}
                  className="side-bar-link  d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={link.icon} />
                  <p
                    className="p-0 m-0 pl-3"
                    style={{
                      display:
                        windoeSize.widthSize < 768
                          ? menu.isOpen
                            ? "none"
                            : "none"
                          : "block",
                    }}
                  >
                    {link.title}
                  </p>
                </NavLink>
              </>
            )
          );
        })}
    </div>
  );
};

export default SideBar;
