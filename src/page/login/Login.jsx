import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Login() {
  // 초기 세팅
  const navigate = useNavigate();
  const loadingRef = useRef();

  const dispatch = useDispatch(); //store 저장






  

  return (
    <div className="main-page-wrap h-screen">
  <div
    className="login-page w-full h-full bg-white flex items-center justify-center"
  >
    <img
      src="/pda/images/login.png"
      alt="login"
      className="max-w-full max-h-full object-contain"
    />
  </div>
</div>
  );
}

export default Login;
