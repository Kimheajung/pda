import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tooltip } from 'primereact/tooltip';

import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';



const Layout09 = () => {

  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);
  const regions = [
    { label: "서울", value: "seoul" },
    { label: "부산", value: "busan" },
    { label: "대전", value: "daejeon" },
  ];

  //툴팁
  const bellRef = useRef(null);  

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

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: '제목', code: 'NY' },
      { name: '작성자', code: 'RM' },
      { name: '내용', code: 'LDN' }
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
      <div className="grid-searchwrap grid-searchwrap--4col" >
      
        <div className="row">
          <div className="th merge-5 gap-4">
            <Dropdown value={selectedCity}  className="w-28" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="제목"/>
             <IconField iconPosition="right">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText placeholder="입력해주세요"  className="w-full"/>
                </IconField>    
          </div>
         
          
        </div>
        
      </div>
    </div>
  );


  return (
    <div className="card height-01">  
     {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-4">
              <h2>7.공지사항 (CRUD) 레이아웃 </h2>
              <div className="flex gap-2">
              {/* 공통 : 메뉴별 새창열기 */}
              <Button
                icon="pi pi-external-link"
                className="layout-newwindow-button"
                aria-label="New Windows"
                text 
                tooltip="윈도우 새창"
                tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15 }}
                onClick={() => window.open(window.location.href, "_blank")}
              />
              {/* 공통 : 메뉴별 즐겿자기 */}
              <Button
                icon={filled ? "pi pi-star-fill" : "pi pi-star"}
                className="layout-Favorite-button"
                onClick={() => setFilled((prev) => !prev)}
                aria-label="Favorite"
                tooltip="즐겨찾기 메뉴"
                tooltipOptions={{ position: "bottom", mouseTrack: true, mouseTrackTop: 15 }}
                text 
              />
              </div>
            </div>          
            <div className="flex items-center" >
               <BreadCrumb model={items} home={home}  />               
               {/* 공통 : 메뉴별 도움말 */}
                <Tooltip target=".has-tooltip" position="bottom" mouseTrack mouseTrackTop={15} />
               <button className="layout-BreadCrumb-button has-tooltip" data-pr-tooltip="업무매뉴얼" onClick={() => setVisibleRight(true)}>
                  <i className="pi pi-exclamation-circle"/>
                </button>
            </div>
        </div>

        {/* 공통 : 업무영역에 대한 도움말 사이드바 */}
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="favorite-help-sidebar">
          <h3 className="absolute top-[1.6rem]"> 업무영역별 도움말</h3>

          <img src="/green/images/sample.png" alt="main" className="max-w-none"  />

          <p>기능설명</p>
          <span>
           1. 각 업무화면의 매뉴얼 버튼을 클릭하면 해당화면의 주요기능을 설명하는 화면이 제공됩니다. <br/>
           2. 이미지가 있으면 이미지 업로드 하게 만들면 됩니다.
          </span>
        </Sidebar>


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

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
                      {/* Accordion Header */}
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

            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap">
               <div className="flex">
                  <span className="NumText"> 조회결과</span>
                  <p class="totalNumText" >총&nbsp;<span>3</span>건</p>
               </div>
               <div className="flex gap-2"> 
                 <Link to="/layout09view"><Button label="임시-상세보기" className="btn-28-sec" severity="secondary" outlined /> </Link>
                <Link to="/layout09write">
                  <Button 
                    label="등록" 
                    className="btn-28-master" 
                    severity="secondary" 
                    outlined
                  />
                </Link>
              </div>
            </div>
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">
              <CustomAgGrid
                  gridId="grid1" // 필수 입력
                  rowId="ROW_ID" // 필수 입력
                  ref={gridRef} // 필수 입력
                  rowData={rowData} // 필수 입력
                  colDefs={colDefs} // 필수 입력
                  overrideRowClicked={() => {
                    return null;
                  }}
                  overrideRowSelection={() => {
                    return null;
                  }}
                  onGridReady={(params) => params.api.autoSizeAllColumns()}
                  // 필요 시 옵션 추가
                />
            </div>


           
        </div>
    </div> 
  );
};

export default Layout09;
