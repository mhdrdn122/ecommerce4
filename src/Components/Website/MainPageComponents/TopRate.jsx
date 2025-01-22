import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LATEST, TOP_RATE } from "../../../Api/api";
import Product from "./Product";
import SkeltonShow from "../../Skelton/SkeltonShow";

const TopRate = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const products = await Axios.get(`${TOP_RATE}`);
    setProductData(products.data);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="bootstrap-tabs product-tabs">
          <div className="tabs-header d-flex justify-content-between border-bottom my-5">
            <h2 className="text-black">Top Rate Products</h2>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-all"
              role="tabpanel"
              aria-labelledby="nav-all-tab"
            >
              <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {loading ? (
                  <div className="d-flex w-100">
                    <SkeltonShow
                      classes={
                        "col-lg-3 col-md-6 col-12 d-flex gap-4 w-100 align-items-between my-5 flex-wrap  justify-content-center "
                      }
                      width={"180px"}
                      height={"300px"}
                      length={4}
                    />
                  </div>
                ) : (
                  productData.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRate;
