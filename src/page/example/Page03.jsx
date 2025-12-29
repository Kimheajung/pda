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

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';



const Page03 = () => {

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

  /*input, combobox */
  const [value, setValue] = useState('');

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
    <div className="card height-full">  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>코드관리 &gt; 속성마스터 </h2>
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
        <div className="hugreen_grid flex-1 flex mt-4 flex-wrap md:flex-row">

            
           
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">
                <div class="flex gap-4 w-full  h-full flex-col md:flex-row gap-4 md:flex-nowrap">
                    <div class="w-full md:!w-1/3 h-full">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                            <div className="flex">
                            <span className="NumTitle"> 코드속성마스터</span>
                            </div>
                        </div>
                        <div className='hugreen_aggrid_hwrap_aggrid'>
                            <DataGrid
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
                    <div class="w-full md:!w-2/3 h-full">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                            <div className="flex">
                            <span className="NumTitle"> 코드속성디테일</span>
                            </div>
                        <div className="flex gap-2"> 
                            <Button label="추가" className="btn-28-sec" severity="secondary" outlined />
                            <Button label="수정" className="btn-28-sec" severity="secondary" outlined />
                            <Button label="등록" className="btn-28-master" severity="secondary" outlined />
                        </div>
                        </div>
                        <div className='hugreen_aggrid_hwrap_aggrid'>
                            <DataGrid
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
            </div>


           
        </div>
    </div> 
  );
};

export default Page03;
