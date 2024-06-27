import ENDPOINT from "../constants/endpoint";
import { useEffect, useState } from "react";
import axiosInstance from "../constants/axiosIntance";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

function ProductListing() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProductList = async (query) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };
      const qp = query ? `?q=${query}` : "";
      const { data } = await axiosInstance.get(`${ENDPOINT.PRODUCT.ALL}${qp}`, {
        headers,
      });
      if (Array.isArray(data?.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = debounce((searchQuery) => {
    fetchProductList(searchQuery);
  }, 300);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleCardClick = (selectedProductId) => {
    navigate(`/product/${selectedProductId}`);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  if (loading) {
    return (
      <div className="product-list-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="title">Product Catalog</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by category / name"
        />
      </div>
      {!products.length ? (
        <p className="error-message">No Product Found</p>
      ) : null}
      <div className="product-list">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => handleCardClick(product.id)}
          >
            <div className="product-details">
              <h3>
                {product.company_name} <span>({product.data_category})</span>
              </h3>
              <a
                href={product.company_website}
                target="_blank"
                rel="noreferrer"
              >
                Website link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
