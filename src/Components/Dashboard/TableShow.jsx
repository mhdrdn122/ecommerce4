import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaginatedItems } from "../Pagination/Pagination";
import { Axios } from "../../Api/Axios";
import Cookis from "cookie-universal";
import LoadingTable from "../Loading/LoadingTable";

const TableShow = ({
  header,
  data,
  currentUser,
  total,
  keySearch,
  setLimit,
  limit,
  setPage,
  del,
}) => {
  currentUser = currentUser || false;
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [reRender, setReRender] = useState(true);

  let dataFiltering = search.length > 0 ? dataSearch : data;

  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  const headerTable = header.map((item, index) => (
    <th key={index}>{item.key}</th>
  ));

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length > 0) getDataWithSearch();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const getDataWithSearch = async () => {
    try {
      setLoading(true);

      const res = await Axios.post(`${keySearch}/search?title=${search}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setDataSearch(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handelDelete = (id) => {
    del(id);
  };

  const dataTable = dataFiltering.map((item1, index) => (
    <tr key={index}>
      <td>{index + 1}</td>

      {header.map((item2, idx) => (
        <td
          className="text-center text-truncate"
          key={idx}
          style={{ maxWidth: "150px" }}
        >
          {currentUser && item1[item2.key] === currentUser.name ? (
            item1[item2.key] + " (You)"
          ) : item1[item2.key] === "1995" ? (
            "admin"
          ) : item1[item2.key] === "1992" ? (
            "Writer"
          ) : item1[item2.key] === "1999" ? (
            "product"
          ) : item1[item2.key] === "2001" ? (
            "user"
          ) : item2.key === "images" ? (
            <div className="d-flex flex-wrap gap-2">
              {item1[item2.key].map((img, i) => (
                <img
                  key={i}
                  className="img-fluid"
                  width={50}
                  // src={"https://backend-ecomerce4-production.up.railway.app" + img.image}
                  src={"https://backend-ecomerce4-production.up.railway.app" + img.image}

                  alt="img-product"
                />
              ))}
            </div>
          ) : item2.key === "image" ? (
            <img
              className="img-fluid img-thumbnail"
              alt="img-category"
              style={{ width: "100px" }}
            
            // src={`https://backend-ecomerce4-production.up.railway.app${item1[item2.key]}`}
            src={`https://backend-ecomerce4-production.up.railway.app${item1[item2.key]}`}

            />


          ) : (
            item1[item2.key]
          )}
        </td>
      ))}

      <td>
        <div className="d-flex gap-2">
          <FontAwesomeIcon
            cursor={
              item1.id === currentUser.id
                ? "no-drop"
                : loadingDelete === null
                ? "pointer"
                : "no-drop"
            }
            onClick={() => {
              handelDelete(item1.id);
            }}
            fontSize="19px"
            color={item1.id === currentUser.id ? "#f5abab" : "red"}
            icon={faTrash}
          />

          <Link to={`${item1.id}`}>
            <FontAwesomeIcon
              cursor="pointer"
              fontSize="19px"
              icon={faPenToSquare}
            />
          </Link>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          name="search"
          placeholder="search ..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id="search"
          type="search"
        />
      </Form.Group>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              {headerTable}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {!loading && data.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center">
                  <LoadingTable />
                </td>
              </tr>
            ) : dataTable.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center">
                  Not Found
                </td>
              </tr>
            ) : (
              dataTable
            )}
          </tbody>
        </Table>
      </div>

      <div className="w-100 d-flex justify-content-center align-items-center gap-5">
        <span>
          total items: {search.length > 0 ? dataFiltering.length : total}
        </span>
        <PaginatedItems
          setPage={setPage}
          limit={limit}
          total={search.length > 0 ? dataFiltering.length : total}
        />
        <Form.Select
          style={{ width: "100px" }}
          name="countPages"
          onChange={(e) => setLimit(e.target.value)}
          id="countPages"
          required
        >
          <option value="">select</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default TableShow;
