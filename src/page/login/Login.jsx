// // css
// import '../../assets/css/common';
// import '../../assets/css/content.css';
//react
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setLocalStorage
} from '../../util/Storage';
import UseModalHook from '../../components/modal/UseModalHook';
import Loading from '../../util/Loading';
import * as commonFunction from '../../util/CommonFunction';
import { Post } from '../../api/CommonCall';

function Login() {
  // 초기 세팅
  const navigate = useNavigate();
  const loadingRef = useRef();

  const dispatch = useDispatch(); //store 저장

  // 초기 세팅 : Alert창 관련
  const alertRef = useRef();
  const [aitem, setaItem] = useState({
    cn: '',
    url: ``,
  });
  function aAlert(cn, fnName, url) {
    alertRef.current.getVisible();
    setaItem({
      content: cn,
      url: url,
    });
  }




  // -----------------------------------------------------

  //변수 설정

  const [email, setEmail] = useState('test3'); //사원번호
  const [password, setPassword] = useState('1234');

  // validation 유효성 검증
  function validationCheck() {
    if (commonFunction.nullBlankCheck(email)) {
      aAlert('아이디를 입력해 주세요.', '알림');
      return;
    } else if (commonFunction.nullBlankCheck(password)) {
      aAlert('비밀번호를 입력해 주세요.', '알림');
      return;
    }

    return true;
  }

  function resultCheck(result) {
    let message = '';
    if (result === undefined) {
      aAlert('통신이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
      loadingRef.current.close();
      return;
    }

    if (loadingRef.current === null || loadingRef.current === undefined) {
      return false;
    } else {
      loadingRef.current.close();
    }
    let check = false;
    if (
      result === null ||
      result === undefined ||
      result.data === null ||
      result.data === undefined
    ) {
      check = false;
    } else {
      if (result.status === undefined) {
        check = false;
        return;
      } else {
        if (result.status !== 200) {
          console.log(`Error: ${result.status} ${message}`);
          if (result.status === 500) {
            return;
          }
          if (result.status === 206) {
            //비밀번호 설정이 되지 않은 신규 사용자
            return;
          }
          if (result.status === 207) {
            //비밀번호 3개월 만료
            aAlert(`${message}`, `알림`);
            return;
          }
          if (result.status === 406) {
            aAlert(`${message}`, `알림`);
            return;
          }
          if (result.status === 400) {
            aAlert(`${message}`, `알림`);
            return;
          }
          check = false;
        } else {
          check = true;
        }
      }
    }
    return check;
  }

  // 로그인버튼 클릭
  const loginButtom = async () => {

    //서버로 보낼 DOT : json 형식 => Header + body
    let dto = {
      header: {
        LOGIN_ID: 'mypooh93',
        USER_PASSWORD: 'QdnD5kHyrxFjaD7rL6NLkw==',
      },
    };

    // 호출 Api 설정
    const result = await Post(`/cygnusin/v1/api/sm/login`, dto, loadingRef);

    // 서버에서 들어오는 result 결과처리
    if (resultCheck(result)) {
      console.log('result', result);
      // Storage 저장
      const menuList = result.data.body.data.MENU_LIST;
      const userInfo = result.data.body.data.USER_INFO;
      const commonList = result.data.body.data.COMMON_LIST;

      let bpList = result.data.body.data.BP_LIST;
      // const itemList = result.data.body.data.ITEM_LIST;
      const storageList = result.data.body.data.STORAGE_LIST;
      const userAuthList = result.data.body.data.USER_AUTH_LIST;
      const userList = result.data.body.data.USER_LIST;
      const locationList = result.data.body.data.LOCATION_LIST;
      const bpShiptoList = result.data.body.data.BP_SHIP_TO_LIST;

      // token 과 refreshToken 선언
      const token = result.data.body.data.TOKEN.JWT;
      const refreshToken = result.data.body.data.TOKEN.REFRESH_JWT;
      // const expireYn = result.data.body.data.userExpireYN;
      const dashobardList = result.data.body.data.DASHBOARD;

      setLocalStorage('token', token);
      setLocalStorage('refreshToken', refreshToken);

      setLocalStorage('rdv_layout', JSON.parse(dashobardList.RDV_LAYOUT));
      setLocalStorage(
        'dashboardLayout',
        JSON.parse(dashobardList.DASHBOARD_LAYOUT)
      );
      setLocalStorage('charts', JSON.parse(dashobardList.CHARTS));

      dispatch({
        type: 'DASHBOARD_LIST',
        payload: dashobardList,
      });

      dispatch({
        type: 'MENU_LIST',
        payload: menuList,
      });

      dispatch({
        type: 'USER_INFO',
        payload: userInfo,
      });

      dispatch({
        type: 'COMMON_LIST',
        payload: commonList,
      });
      bpList &&
        bpList.map((item) => {
          item.label = item.BP_NAME;
          item.value = item.BP_ID;
        });
      bpList.unshift({ label: '전체', value: '' });
      dispatch({
        type: 'BP_LIST',
        payload: bpList,
      });
      // dispatch({
      //   type: 'ITEM_LIST',
      //   payload: itemList,
      // });
      dispatch({
        type: 'STORAGE_LIST',
        payload: storageList,
      });
      dispatch({
        type: 'USER_AUTH_LIST',
        payload: userAuthList,
      });
      dispatch({
        type: 'USER_LIST',
        payload: userList,
      });
      dispatch({
        type: 'LOCATION_LIST',
        payload: locationList,
      });
      dispatch({
        type: 'BP_SHIP_TO_LIST',
        payload: bpShiptoList,
      });

      // if (expireYn === 'Y') {
      //   aAlert('사용자 계정이 중지되었습니다.', '알림');
      // } else {
      //   navigate('/main/dashboard');
      // }

      if (result.data.body.data.USER_INFO.USE_YN === 'Y') {
        navigate('/dashboard');
      } else {
        aAlert('사용자 계정이 중지되었습니다.', '알림');
        return;
      }
    }
  };

  return (
    <div className="main-page-wrap" style={{ backgroundColor: '#ff6219' }}>
      <div
        className="login-page"
        // style={{ width: '70vh', background: 'white' }}
        style={{ width: '100%', background: 'white' }}
      >
        {/* <MDBCol md="6" style={{ alignContent: 'center', zoom: 1.5 }}> */}
        <div className="d-flex flex-row">
          {/* <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: '#ff6219' }}
                    /> */}
          <span className="h1 fw-bold mb-0">CYGNUS</span>
        </div>
        <h5
          // className="fw-normal my-4 pb-3"
          className="fw-normal my-3"
          style={{ letterSpacing: '1px' }}
        >
          {/* 로그인을 하세요. */}
        </h5>
        <input
          // label="사원번호"
          id="formControlLg"
          type="email"
          size="lg"
          onChange={(e) => {
            // 입력 id 앞, 뒤 공백 제거
            let trimId = e.target.value.trim();
            setEmail(trimId);
            // setEmail(e.target.value);
          }}
          placeholder="아이디"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (validationCheck()) {
                loginButtom();
              }
            }
          }}
        />
        <br/>
        <input
          // label="비밀번호"
          id="formControlLg"
          type="password"
          size="lg"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (validationCheck()) {
                loginButtom();
              }
            }
          }}
        />
               <br/>
        <button
          size="lg"
          style={{
            backgroundColor: '#F36162',
            borderColor: '#F36162',
            border: '1px solid #F36162',
            color: 'white',
            borderRadius: '0.3rem',
            fontSize: '1.25rem',
            fontWeight: '400',
          }}
          onClick={() => {
            if (validationCheck()) {
              loginButtom();
            }
          }}
        >
          로그인
        </button>
        <div className="d-flex flex-row justify-content-start">
          <a href="#!" className="small text-muted me-1">
            CYGNUS Copyright © 2025. All rights reserved.
          </a>
        </div>
        <UseModalHook props={aitem} ref={alertRef} />
        <Loading ref={loadingRef} />
      </div>
    </div>
  );
}

export default Login;
