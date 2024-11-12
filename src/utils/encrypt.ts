import { secretKeyPortalId } from "@config/environment";
import CryptoJS from "crypto-js";

const secretKey = CryptoJS.enc.Hex.parse(secretKeyPortalId);
const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey, { iv }).toString();
};

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey, { iv: iv });
  return bytes.toString(CryptoJS.enc.Utf8);
};
