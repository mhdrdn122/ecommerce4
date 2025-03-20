import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaginatedItems } from "../Pagination/Pagination";
import { Axios } from "../../Api/Axios";
import Cookis from "cookie-universal";
import LoadingTable from "../Loading/LoadingTable";
import "./TableShow.css";
import { BASEURLMINE } from "../../Api/api";

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
  // State management for search, filtered data and loading states
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);

  // Determine which data set to display based on search input
  const dataFiltering = search.length > 0 ? dataSearch : data;

  // Get authentication token from cookies
  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  // Map table headers
  const headerTable = header.map((item, index) => (
    <th key={index}>{item.key}</th>
  ));

  // Debounce search input to fetch data with delay
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length > 0) getDataWithSearch();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  // Fetch data based on search query
  const getDataWithSearch = async () => {
    try {
      setLoading(true);
      const res = await Axios.post(`${keySearch}/search?title=${search}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setDataSearch(res.data);
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Failed to load search results.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action with Toastify notifications
  const handleDelete = async (id) => {
    try {
      setLoadingDelete(id);
      await del(id);
      toast.success("Item deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete item.");
    } finally {
      setLoadingDelete(null);
    }
  };

  // Render table rows with enhanced animations and effects
  const dataTable = dataFiltering.map((item1, index) => (
    <tr key={index}>
      <td>{item1.id}</td>
      {header.map((item2, idx) => (
        <td
          className="text-center text-truncate"
          key={idx}
          style={{ maxWidth: "150px" }}
        >
          {item2.key === "images" ? (
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {item1[item2.key].map((img, i) => (
                <img
                  key={i}
                  className="img-fluid"
                  width={50}
                  src={`${BASEURLMINE}${img.image}`}
                  alt="img-product"
                />
              ))}
            </div>
          ) : item2.key === "image" ? (
            <img
              className="img-fluid img-thumbnail"
              alt="img-category"
              style={{ width: "100px" }}
              src={`${BASEURLMINE}${item1[item2.key]}`}
            />
          ) : (
            item1[item2.key]
          )}
        </td>
      ))}

      <td>
        <div className="d-flex gap-2 justify-content-center">
          <FontAwesomeIcon
            cursor="pointer"
            fontSize="19px"
            color="red"
            icon={faTrash}
            onClick={() => handleDelete(item1.id)}
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
      <ToastContainer />
      <Form.Group className="mb-3">
        <Form.Control
          name="search"
          placeholder="Search ..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id="search"
          type="search"
        />
      </Form.Group>

      <div className="table-responsive">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
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
    </div>
  );
};

export default TableShow;
