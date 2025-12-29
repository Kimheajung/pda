/* eslint-disable */
import axios from 'axios';
import { getLocalStorage , clearLocalStorage , setLocalStorage } from '../util/Storage';

const conf = {
  // baseURL 공용 붙힐곳
  baseURL: `http://59.150.255.121:2108/`,

  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: true,
  },
  timeout: 100000,
  responseType: 'json',
};

// Axios instance Create
const instance = axios.create(conf);

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token');
    if (token) {
      if (config.headers.Authorization == undefined) {
        config.headers['Authorization'] = `Bearer AToken ${token}`;
      } else if (config.headers.Authorization.includes('RToken')) {
        config.headers['Authorization'] = `Bearer RToken ${token}`;
      }
    } else {
      delete config.headers['Authorization'];
    }
    // Content-Type이 multipart/form-data일 경우 설정
    return config;
  },
  (error) => Promise.reject(error)
);

const getNewAccessToken = async () => {
  try {
    const refreshToken = getLocalStorage('refreshToken');
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/cygnusin/v1/api/token/token-checking`,
      {
        headers: {
          Authorization: `Bearer RToken ${refreshToken}`,
        },
      }
    );
    if (response.status === 200) {
      const newAccessToken = response.data.body.data.jwt;
      const newRefreshToken = response.data.body.data.refreshJwt;
      return { newAccessToken, newRefreshToken };
    }
  } catch (error) {
    console.error('Error while getting new access token:', error);
    throw error;
  }
};

instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    // response error
    let errorRes;
    if (error.response !== undefined) {
      const status = error.response.status;
      const originalRequest = error.config;

      /*******정리 *******/
      // 1. 처음 로그인시에 AToken 과 RToken 을 발급받는다.
      // 2. API 호출시 AToken 이 만료가 되면 409 Error를 뱉는다.
      // 3. RToken 을 http://117.52.64.23:8080/cygnusin/v1/api/token/token-checking 헤더에 RToken을 넣어서 유효성 테스트를한다.
      // 4. getNewAccessToken() 안에 발급받은 newAccessToken , newRefreshToken 토큰을 헤더에 다시 담는다.
      if (status == 409 && originalRequest._retry === undefined) {
        // token error
        try {
          originalRequest._retry = true;
          const refreshToken = getLocalStorage('refreshToken');
          const { newAccessToken, newRefreshToken } = await getNewAccessToken();
          console.log(newAccessToken + '-------- newnewAccess');
          console.log(newRefreshToken + '-------- newrefreshAccess');
          originalRequest.headers[
            'Authorization'
          ] = `Bearer AToken ${newAccessToken}`;
          setLocalStorage('token', newAccessToken);
          setLocalStorage('refreshToken', newRefreshToken);
          return instance(originalRequest);
        } catch (error) {
          console.error('Error refreshing token:', error);
          clearLocalStorage('token');
          clearLocalStorage('refreshToken');
          window.location.href = '/';
        }
      } else if (status == 410) {
        clearLocalStorage('token');
        clearLocalStorage('refreshToken');
        window.location.href = '/';
      }
      if (
        error.response &&
        error.response.data &&
        error.response.data.status === 'error' &&
        error.response.data.data === 'BAD_REQUEST'
      ) {
        errorRes = error.response;
      } else {
        console.log('==========error.response.data:===========');
        console.log(error);
        console.log('================================');
        errorRes = error.response;
      }
    }
    return errorRes;
  }
);

export default instance;
