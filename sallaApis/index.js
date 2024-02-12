import axios from "axios";

export const getUserInfo = async (accessToken) => {
  const options = {
    method: "GET",
    url: "https://api.salla.dev/admin/v2/oauth2/user/info",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log("**********user data********", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductData = async (accessToken, productId) => {
  const options = {
    method: "GET",
    url: `https://api.salla.dev/admin/v2/products/${productId}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
