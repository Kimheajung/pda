// import axios from "axios";
import axios from './axios';

const sHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    processData: false,
    cache: false,
  },
};
const sHeader2 = {
  headers: {
    'Content-Type': 'application/json',
    processData: false,
    cache: false,
  },
};
const stype = { responseType: 'blob' };

// axios 모듈화 작업한걸 import 해온뒤에 컴포넌트 내부에서 쓰일 Api
// apiService 에서 확인
export const Get = (url, param, ref) => {
  if (ref.current !== undefined || ref.current !== null || ref.current !== '') {
    ref.current.open();
  }
  return axios.get(url, param);
};
export const Post = (url, param, ref) => {
  if (ref.current !== undefined || ref.current !== null || ref.current !== '') {
    ref.current.open();
  }
  return axios.post(url, param);
};

export const Postfile = (url, param, ref) => {
  if (ref.current !== undefined || ref.current !== null || ref.current !== '') {
    ref.current.open();
  }
  return axios.post(url, param, sHeader);
};

export const Postfile2 = (url, param) => {
  return axios.post(url, param, sHeader2);
};

export const PostList = (url, param) => {
  return axios.post(url, param);
};

export const PostDownload = (url, param) => {
  return axios.post(url, param, stype);
};

export const GetDownload = (url, param) => {
  return axios.get(url, param, stype);
};

export const GetList = (url, param) => {
  return axios.get(url, param);
};
