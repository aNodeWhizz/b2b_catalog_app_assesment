const apiBaseUrl = `${import.meta.env["VITE_API_BASE_URL"]}/v1`;

const ENDPOINT = {
  LOGIN: `${apiBaseUrl}/auth/login`,
  PRODUCT: {
    ALL: `${apiBaseUrl}/product`,
    ID: (productId) => `${apiBaseUrl}/product/${productId}`,
  },
};

export default ENDPOINT;
