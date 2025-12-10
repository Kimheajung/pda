import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Password } from "primereact/password";
import { Dialog } from 'primereact/dialog';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';

const LoginSample = () => {


// 임시용
const [userId, setUserId] = useState("");
const [password, setPassword] = useState("");
const [rememberId, setRememberId] = useState(false);
const [pwModal, setPwModal] = useState(false);



 /*input, combobox */
  const [value, setValue] = useState('');
  const [ingredient, setIngredient] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  /* 페크박스  */
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };



  return (
     <div className="login-container">

            {/* 로그인 카드 */}
            <div className="login-box">

                <h2 className="login-title">
                    <span>Welcome to</span>
                    <span>휴그린 건자재 시스템</span>
                </h2>

                {/* 아이디 입력 */}
                <div className="login-input-group">
                    <label>아이디</label>
                    <InputText
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full"
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="login-input-group">
                    <label>비밀번호</label>
                    <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        feedback={false}
                        toggleMask
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                {/* 로그인 버튼 */}
                <Button label="로그인" className="login-button w-full" />

                {/* 체크박스 + 비밀번호 찾기 */}
                <div className="login-sub-options">
                    <div className="remember-area">
                        <Checkbox
                            inputId="rememberId"
                            checked={rememberId}
                            onChange={(e) => setRememberId(e.checked)}
                        />
                        <label htmlFor="rememberId" className="remember-label">
                            아이디 저장
                        </label>
                    </div>

                    <button
                        className="pw-find-button"
                        onClick={() => setPwModal(true)}>
                        비밀번호 찾기
                    </button>
                </div>

                <div className="login-sub-bottom">
                    <div className="infotext_left">
                        <span>시스템 오류발생시 관리자에게 문의</span>
                    </div>

                    <div className="infotext_right">
                        02-6961-1988
                    </div>
                </div>
            </div>

            {/* 비밀번호 찾기 모달 */}
            <Dialog
                header="비밀번호 찾기"
                visible={pwModal}
                style={{ width: "100%", maxWidth: "540px" }}
                onHide={() => setPwModal(false)}
                draggable={false}
                resizable={false}
            >
                {/* 공통 : ag그리드  */}
                <div className="flex w-full">
                    <div className="grid-view">
                    <span class="InfoText block mt-4"> 임시비밀번호 발급을 위해 미리 등록한 외부이메일 입력</span>
                    <span class="InfoText block mb-4"> 외부 이메일에서 임시비밀번호 확인하여 로그인</span>
                    <div className="row">
                        <div className="th">사용자 ID</div>
                        <div className="td gap-2 flex flex-col sm:flex-row items-center sm:items-center">
                        <InputText
                            className="w-40"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="선택해주세요"
                        />
                         <Button
                            label="아이디확인"
                            className="btn-28-master w-full sm:w-auto"
                            severity="secondary"
                            outlined
                        />
                        </div>
                    </div>

                    <div className="row">
                        <div className="th">이메일주소</div>
                        <div className="td gap-2 flex flex-col sm:flex-row items-center sm:items-center">
                        <InputText
                            className="w-60"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="선택해주세요"
                        />
                         <Button
                            label="인증코드발송"
                            className="btn-28-master w-full sm:w-auto"
                            severity="secondary"
                            outlined
                        />
                        </div>
                    </div>

                    <div className="row">
                        <div className="th">인증코드</div>
                        <div className="td">
                        <InputText
                            className="w-40"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="입력해주세요"
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </Dialog>
        </div>
  );
};

export default LoginSample;
