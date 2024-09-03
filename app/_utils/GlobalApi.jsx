const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.1.247:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

// return the data because we will you it at a server component where you can't use hooks (useEffect)
const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);
const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);
const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((res) => res.data.data);
const register = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });
const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });
const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItems = data.map((item) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.mrp,
        id: item.id,
        product: item.attributes.products?.data[0]?.id,
      }));
      return cartItems;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
const getAllOrders = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`
    )
    .then((res) => {
      const response = res.data.data;
      const ordersList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item?.attributes?.totalOrderAmount,
        paymentId: item?.attributes?.paymentId,
        orderItemList: item?.attributes?.orderItemList,
        createdAt: item?.attributes?.createdAt,
        status: item?.attributes?.status,
      }));
      return ordersList;
    });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  register,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getAllOrders,
};
