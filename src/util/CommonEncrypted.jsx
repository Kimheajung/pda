import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRETKEY);
const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IVKEY);

export const CommonEncrypted = (password) => {
  let text = password.toString();
  const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
    iv: iv,
  });
  const result = encrypted.toString();
  const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
  return { encrypted: result, iv: ivBase64 };
};
