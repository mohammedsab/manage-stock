import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
  created_at: String,
  merchant_id: Number,
  app_name: String,
  accessToken: String,
  expires_at: String,
});

export const MerchantModel = mongoose.model("merchant", merchantSchema);

export const saveMerchant = async (data) => {
  try {
    const newMerchant = new MerchantModel(data);
    await newMerchant.save();
  } catch (error) {
    console.error("Error saving merchant: ", error.message);
    throw error;
  }
};

export const getMerchant = async (id) => {
  const merchant = await MerchantModel.findOne({ merchant_id: id });
  return merchant;
};
