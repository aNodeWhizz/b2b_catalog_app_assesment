import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../constants/axiosIntance";
import ENDPOINT from "../constants/endpoint";
import Spinner from "../Spinner";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetail = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axiosInstance.get(ENDPOINT.PRODUCT.ID(productId), {
        headers,
      });
      if (data?.data) {
        setProductDetail(data.data);
      } else {
        setProductDetail(null);
      }
    } catch (err) {
      console.error(err);
      setProductDetail(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="title">{productDetail.company_name}</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <br />
      <div className="product-card">
        {productDetail ? (
          <div className="product-details">
            <h3>
              {productDetail.company_name}{" "}
              <span>({productDetail.data_category})</span>
            </h3>
            <p className="address">Record count {productDetail.record_count}</p>
            <p className="address">{productDetail.company_address}</p>
            <a
              href={productDetail.company_website}
              target="_blank"
              rel="noreferrer"
            >
              Website link
            </a>
          </div>
        ) : (
          <p className="error-message">No Product Found</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
