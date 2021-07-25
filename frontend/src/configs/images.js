const USER_IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;
const PRODUCT_IMG_URL = process.env.REACT_APP_PRODUCT_IMAGES_URL;

export const getUserImgUrl = (url) => {
  return url?.startsWith("http") ? url : USER_IMG_URL + url;
};

export const getProductImgUrl = (url) => {
  return url?.startsWith("http") ? url : PRODUCT_IMG_URL + url;
};
