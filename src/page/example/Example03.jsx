import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';


import { Accordion, AccordionTab } from "primereact/accordion";

import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';


const Example03 = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const regions = [
    { label: "서울", value: "seoul" },
    { label: "부산", value: "busan" },
    { label: "대전", value: "daejeon" },
  ];


  /* 즐겨찾기 아이콘  */
  const [filled, setFilled] = useState(false);

  /* 업무영역 도움말 패널영역 정의 */
  const [visibleRight, setVisibleRight] = useState(false);

  /* primereact - BreadCrumb */
   const items = [
        { label: '여신관리' },
        {
            label: 'InputText',
            template: () => (
              <Link to="/inputtext" className="p-breadcrumb_now">
                현재페이지
              </Link>
            )
        }
    ];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' };

  /*input, combobox */
  const [value, setValue] = useState('');
  const [ingredient, setIngredient] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  /* 페크박스  */
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
      let _ingredients = [...ingredients];

      if (e.checked)
          _ingredients.push(e.value);
      else
          _ingredients.splice(_ingredients.indexOf(e.value), 1);

      setIngredients(_ingredients);
  }


   /* ag그리드 예제  */
    const gridRef = useRef(null);
    const [rowData] = useState(MOCK_DATA3);
    const [colDefs] = useState([
      {
        field: 'date1',
        headerName: 'date',
        type: ['filterDate'],
      },
      {
        field: 'text1',
        headerName: 'text',
        type: ['textField_center'],
      },
      {
        field: 'text2',
        headerName: 'textarea',
        type: ['textField_left'],
      },
      {
        field: 'number1',
        headerName: 'number1',
        type: ['numberField_center'],
      },
      {
        field: 'number2',
        headerName: 'number2',
        type: ['numberField_right', 'numberFormat'],
      },
      {
        field: 'yn1',
        headerName: '체크박스',
        type: ['checkbox'],
      },
    ]);

  /* 다이얼로그 팝업 */
 const [visible, setVisible] = useState(false);
 const [visible2, setVisible2] = useState(false);
 const [visible3, setVisible3] = useState(false);
 const footerContent = (
        <div className="gap-2">
            <Button label="취소"  onClick={() => setVisible(false)} outlined className='mr-2'/>
            <Button label="적용"  onClick={() => setVisible(false)} autoFocus />
        </div>
    );

  return (
    <div className="card_etc">  

        <h2 className='mb-4'>4. 상세 테이블 예제 </h2>
        <div className="guidetitle">1.상세 - 2칼럼 </div>
        {/* 공통 : 타이틀영역 */}
            {/* 테이블 형태 */}
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--4col-view">
                <div className="row">
                  <div className="th required">등록일</div>
                  <div className="td">
                    <div className="span">2029.000,9999</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">2025.11.01 ~ 2026.12.31</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th">협력업체 기자재 코드</div>
                   <div className="td">
                    <div className="span">가-90-FA</div>
                  </div>
                  <div className="th">작성일자</div>
                   <div className="td">
                    <div className="span">2025.11.01 ~ 2026.12.31</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th required">출처</div>
                   <div className="td">
                    <div className="span">(주)금호석유화확</div>
                  </div>
                  <div className="th">만들이</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                </div>

                 <div className="row">
                  <div className="th">내용</div>
                   <div className="td merge-3">
                    <div className="fulltext">
                        
                        내용	안녕하십니까.
                        예산건자재공장 12월 휴무 일정을 공지드리오니, 업무에 참고하시기 바랍니다.

                        ▶ 공장 가동일 : 2025. 12. 19(금) 까지
                        ▶ 원/부자재 출고일 : 2025. 12. 24(수) 까지

                        - 휴무일정 -
                        ● 2025. 12. 25(목) : 성탄절
                        ● 2025. 12. 26(금) : 샌드위치 휴무
                        ● 2025. 12. 27(토) ~ 2025. 12. 28(일) : 주말 휴무
                        ● 2025. 12. 29(월) ~ 2025. 12. 31(수) : 샌드위치 휴무
                        ● 2026. 01. 01(목) : 신정
                        ● 2026. 01. 02(금) : 샌드위치 휴무

                        * 공장 가동은 12/19(금)까지, 원/부자재 출고는 12/24(수) 까지만 가능하오니, 상기 일정 참고하시어 원/부자재 납기 일정 사전에 조
                        정하시기 바랍니다.
                        (부자재12월달 마감 관련 자료는 12/24(수)까지 송부 부탁드립니다.)

                        감사합니다
                    </div>
                  </div>
                </div>


              </div>
            </div>
            
       
         <div className="guidetitle">2.상세 - 3칼럼 </div>
            {/* 테이블 형태 */}
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--6col">
              
                <div className="row">
                  <div className="th">등록일</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">작성일자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                </div>
                
              </div>
            </div>


        <div className="guidetitle">3.상세 - 4칼럼 </div>
            {/* 테이블 형태 */}
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--8col">
              
                <div className="row">
                  <div className="th">등록일</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">작성일자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                  <div className="th">등록자</div>
                  <div className="td">
                    <div className="span">홍길동</div>
                  </div>
                </div>
                
              </div>
            </div>







        
    </div> 
  );
};

export default Example03;
