import React from "react";
import logo from "../../../Assest/images/logo.png";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/api";
import Cookis from "cookie-universal";
import Logout from "../../../Pages/Auth/Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  const getCategories = async () => {
    try {
      await Axios.get(`${CAT}`).then((data) =>
        setCategories(data.data.slice(-5))
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCategories();
  }, []);

  const categoriesShow = categories.map((cat, index) => {
    return (
      <option className="black" key={index}>
        {cat.title.length > 15 ? cat.title.slice(0, 10) + "..." : cat.title}
      </option>
    );
  });
  return (
    <div class="container-fluid">
      <div class="row py-3 border-bottom">
        <div class="col-sm-4 col-lg-3 text-center text-sm-start">
          <div class="main-logo">
            <a href="/">
              <img src={logo} alt="logo" class="img-fluid" />
            </a>
          </div>
        </div>

        <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5  d-lg-block">
          <div class="search-bar row bg-light p-2 my-2 rounded-4">
            <div class="col-md-4  d-md-block">
              <select
                disabled={loading}
                class="form-select border-0 bg-transparent"
              >
                {loading ? (
                  <option>loading...</option>
                ) : (
                  <option value={-1} disabled={loading}>
                    All Categories
                  </option>
                )}
                {categoriesShow}
              </select>
            </div>
            <div class="col-11 col-md-7">
              <form
                id="search-form"
                class="text-center"
                action="index.html"
                method="post"
              >
                <input
                  type="text"
                  class="form-control border-0 bg-transparent"
                  placeholder="Search for more than 50 products"
                />
              </form>
            </div>
            <div class="col-1 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
          {/* <div class="support-box text-end d-none d-xl-block">
              <span class="fs-6 text-muted">For Support?</span>
              <h5 class="mb-0">+980-34984089</h5>
            </div> */}

          {/* <ul class="d-flex justify-content-end list-unstyled m-0">
              <li>
                <a href="#" class="rounded-circle bg-light p-2 mx-1">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use href="#user"></use></svg>
                </a>
              </li>
              <li>
                <a href="#" class="rounded-circle bg-light p-2 mx-1">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use href="#heart"></use></svg>
                </a>
              </li>
              <li class="d-lg-none">
                <a href="#" class="rounded-circle bg-light p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use href="#cart"></use></svg>
                </a>
              </li>
              <li class="d-lg-none">
                <a href="#" class="rounded-circle bg-light p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use href="#search"></use></svg>
                </a>
              </li>
            </ul> */}

          {/* <div class="cart text-end  d-lg-block dropdown">
              <button class="border-0 bg-transparent d-flex flex-column gap-2 lh-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                <span class="fs-6 text-muted dropdown-toggle">Your Cart</span>
                <Cart />
                <span class="cart-total fs-5 fw-bold">$1290.00</span>
              </button>
            </div> */}

          {token ? (
            <div class="cart text-end d-flex align-items-center  gap-2 dropdown">
              <button
                style={{ backgroundColor: "#FFC43F", color: "#fff" }}
                class="border-0 btn d-flex  gap-2 lh-1"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart"
              >
                <Cart />
              </button>

              <Logout />
            </div>
          ) : (
            <div class=" text-end d-flex align-items-center p-3  gap-2 ">
              <Link to="/login">
                <button
                  style={{ backgroundColor: "#FFC43F", color: "#000" }}
                  class="border-0 btn d-flex  p-3 gap-2 lh-1"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  login
                </button>
              </Link>

              <Link className="bolder" to="/register">
                <button
                  style={{ backgroundColor: "#FFC43F", color: "#000" }}
                  class="border-0 btn d-flex  p-3 gap-2 lh-1"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
