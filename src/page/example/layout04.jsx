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
import { Accordion, AccordionTab } from "primereact/accordion";

import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';



const Layout04 = () => {

  /* 모바일 검색영역 감추기 */
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

  /*input, combobox , radiobutton */
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

  // 검색영역 폼 
  const SearchForm = ({ value, setValue, selectedCity, setSelectedCity, cities }) => (
    <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--6col">
      
        <div className="row">
          <div className="th"> <label for="firstname5">오더일자</label></div>
          <div className="td">
            <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full" placeholder="선택해주세요"/>  
          </div>
          <div className="th">금형</div>
          <div className="td">
            <div className="flex">
              <IconField iconPosition="right">
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText placeholder="입력해주세요"  className="w-full"/>
              </IconField>
            </div>
            
          </div>
          <div className="th">시스템명</div>
          <div className="td">
            <Dropdown value={selectedCity}  className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="선택해주세요"/>
          </div>
        </div>
        
      </div>
    </div>
  );


  return (
    <div className="card height-01">  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>3.검색 + 상세보기 + 그리드 복합형 </h2>
              {/* 공통 : 메뉴별 즐겿자기 */}
              <Button
                icon={filled ? "pi pi-star-fill" : "pi pi-star"}
                className="layout-Favorite-button"
                onClick={() => setFilled((prev) => !prev)}
                aria-label="Favorite"
                text 
              />
            </div>          
            <div className="flex items-center">
               <BreadCrumb model={items} home={home} />               
               {/* 공통 : 메뉴별 도움말 */}
               <button className="layout-BreadCrumb-button" onClick={() => setVisibleRight(true)}>
                  <i className="pi pi-exclamation-circle"/>
                </button>
            </div>
        </div>

        {/* 공통 : 업무영역에 대한 도움말 사이드바 */}
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <h2> 업무영역별 도움말R</h2>
          <span>이미지 + 해당화면 업무설명</span>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Sidebar>


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex flex-1 flex-wrap md:flex-row">

            {/* 공통 검색영역(PC+모바일대응) */}
            <div className="hugreen_grid flex-1 flex flex-wrap">
              {/* PC (md 이상) */}
              <div className="hugreen_searchwrap hidden md:flex transition-all duration-300">
                <div className="flex">
                  <SearchForm value={value} setValue={setValue} selectedCity={selectedCity} setSelectedCity={setSelectedCity} cities={cities} />
                </div>
                <div className="flex search-btn-wrap">
                  <Button label="검색" text  className="search-btn"/>
                </div>
              </div>

              {/* 모바일 (sm 이하) */}
              <div className="w-full md:hidden">
                <div className="hugreen_searchwrap overflow-hidden">
                 
                  <button
                  type="button"
                  className="flex m_filter_text"
                  onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}>
                  {activeIndex === 0 ? "검색필터 숨기기" : "검색필터 펼치기"}                     
                  </button>

                  {/* Accordion Content with Smooth Animation */}
                  <div
                  className={`overflow-hidden transition-all duration-300  ${
                  activeIndex === 0 ? "max-h-[500px] p-0" : "max-h-0 p-0"} `}>
                    <div className="flex">
                      <SearchForm value={value} setValue={setValue} selectedCity={selectedCity} setSelectedCity={setSelectedCity} cities={cities} />
                    </div>
                    <div className="flex search-btn-wrap">
                      <Button label="검색" text  className="search-btn"/>
                    </div>
                  </div>
                </div>
              </div>

            </div>

           

            {/* 테이블 형태 */}
            <div className="flex w-full">
             <div className="dtv-info-grid">
                <div className="row">
                  <div className="th">등록일</div>
                  <div className="td">2029.000</div>
                  <div className="th">등록자</div>
                  <div className="td">홍길동</div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">999</div>
                  <div className="th">작성일자</div>
                  <div className="td">목요일</div>
                </div>

                <div className="row">
                  <div className="th">출처</div>
                  <div className="td">금호석유화학</div>
                  <div className="th">만들이</div>
                  <div className="td">금화확</div>
                </div>
              </div>
            </div>
            
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--6col">
                <div className="row">
                  <div className="th">등록일</div>
                  <div className="td">2029.000</div>
                  <div className="th">등록자</div>
                  <div className="td">홍길동</div>
                  <div className="th">등록자</div>
                  <div className="td">홍길동</div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">999</div>
                  <div className="th">작성일자</div>
                  <div className="td">목요일</div>
                  <div className="th">등록자</div>
                  <div className="td">홍길동</div>
                </div>
                
              </div>
            </div>


            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap">
              <div className="flex">
                <span className="NumText"> 조회결과</span>
                <p class="totalNumText" >총&nbsp;<span>18,203</span>건</p>
              </div>
               <div className="flex gap-2"> 
                <Button label="저장" className="btn-28-intable" severity="secondary" outlined /> 
                <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                <Button label="검색" className="btn-28-master" severity="secondary" outlined />
              </div>
            </div>
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">
              그리드 들어오는 영역
            </div>

             <div className="hugreen_space"></div>


        </div>
    </div>
    
    

  );
};

export default Layout04;
