import emailSender from "../config/emailSender.js";
import {
  MerchantModel,
  getMerchant,
  saveMerchant,
} from "../models/authModel.js";
import { getUserInfo } from "../sallaApis/index.js";

function addSeconds(date, seconds) {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export const authorize = (res) => {
  const date = new Date();
  const merchantData = {
    created_at: res.created_at,
    merchant_id: res.merchant,
    app_name: res.data.app_name,
    accessToken: res.data.access_token,
    expires_at: addSeconds(date, res.data.expires),
  };

  saveMerchant(merchantData);
};

export const uninstalled = async (merchant) => {
  try {
    await MerchantModel.findOneAndDelete({ merchant_id: merchant });
  } catch (error) {
    console.log(error);
  }
};

export const productCreated = async (product) => {
  const { accessToken } = await getMerchant(product.merchant);
  const userData = await getUserInfo(accessToken);

  if (!product.data.notify_quantity) {
    if (userData) emailSender(userData.data, product.data);
    return;
  }
  console.log("product.data.notify_quantity", product.data.notify_quantity);
};

export const productLow = async (product) => {
  const { accessToken } = await getMerchant(product.merchant);
  const userData = await getUserInfo(accessToken);
  if (userData) {
    emailSender(userData.data, product.data, true);
  }
};
