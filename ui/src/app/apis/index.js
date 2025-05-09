import axios from "axios";
const url = "https://localhost:7293/api/";

export const getAllCategory = async () => {
  try {
    const resp = await axios.get(url + "Product/GetAllCategories");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const getProductsByCategory = async (categoryId) => {
  try {
    const resp = await axios.get(
      `${url}Product/GetProductWithCategories?categoryCode=${categoryId}`
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const getAllCustomer = async () => {
  try {
    const resp = await axios.get(url + "Customer/GetAlCustomers");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const getDoctorByCustomer = async (categoryId) => {
  try {
    const resp = await axios.get(
      `${url}Customer/GetDoctorWithCustomerCode?customerCode=${categoryId}`
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
