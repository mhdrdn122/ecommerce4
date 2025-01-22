import { useEffect, useState } from "react";
import Product from "./Product";
import { Axios } from "../../../Api/Axios";
import { CAT, SALE } from "../../../Api/api";
import SkeltonShow from "../../Skelton/SkeltonShow";
import Cookis from "cookie-universal";

const ProductsTrending = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  const getCategories = async () => {
    const categories = await Axios.get(`/${CAT}?limit=&page=`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setCategoryData(categories.data);
  };

  const getProducts = async () => {
    const products = await Axios.get(`${SALE}`);
    setProductData(products.data);
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true)
    getProducts();
    getCategories();
  }, []);

  // إنشاء أزرار الفلترة باستخدام أسماء الأصناف
  const categories = ["All", ...categoryData.map((cat) => cat.title)];

  // دمج المنتجات مع الأصناف
  const mergedProducts = productData.map((product) => {
    const category = categoryData.find((cat) => cat.id === product.category);
    return {
      ...product,
      categoryTitle: category ? category.title : "Unknown",
    };
  });

  // تصفية المنتجات بناءً على الفئة النشطة
  const filteredProducts =
    activeCategory === "All"
      ? mergedProducts
      : mergedProducts.filter(
          (product) => product.categoryTitle === activeCategory
        );

  return (
    <>
      {loading ? (
        <div className="d-flex">
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
        <section className="py-5">
          <div className="container-fluid">
            <div className="bootstrap-tabs product-tabs">
              <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                <h2 className="text-black">Latest Sale Products</h2>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`nav-link text-uppercase fs-6 ${
                          activeCategory === category ? "active" : ""
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-all-tab"
                >
                  <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {filteredProducts.map((product) => (
                      <Product key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsTrending;
