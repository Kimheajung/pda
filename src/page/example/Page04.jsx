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
              <h2>코드관리 &gt; 계층정보 </h2>
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
            <div className="hugreen_aggrid_hwrap ">
                <div className="flex gap-4 w-full flex-col h-full md:flex-col gap-4 md:flex-nowrap">
                    <div className="flex-[0.8] md:flex-[0.8] min-h-[600px] md:min-h-0">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                            <div className="flex">
                            <span className="NumTitle"> 계층정보</span>
                            </div>
                            <div className="flex gap-2"> 
                                <Button label="수정" className="btn-28-sec" severity="secondary" outlined />
                                <Button label="등록" className="btn-28-master" severity="secondary" outlined />
                            </div>
                        </div>
                        <div className='hugreen_aggrid_hwrap_aggrid2'>
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
                   <div className="flex-[0.2] md:flex-[0.2]">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                            <div className="flex">
                                <span className="NumTitle"> 기본정보</span>
                            </div>
                        </div>
                        <div className='flex'>
                            <div class="flex gap-4 w-full  h-full flex-col md:flex-row gap-4 md:flex-nowrap">
                               <div class="w-full md:!w-1/3 w-full">
                                    <div className="dtv-info-grid dtv-info-grid--4col-etc">
                                        <div className="row">
                                            <div className="th">LV1</div>
                                            <div className="td gap-2 merge-3">
                                                <Dropdown value={selectedCity} className='w-28' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV2</div>
                                            <div className="td gap-2 merge-3">
                                                <Dropdown value={selectedCity} className='w-28' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV3</div>
                                            <div className="td gap-2 merge-3">
                                                <Dropdown value={selectedCity} className='w-28' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-full overflow-auto md:!w-2/3  h-full">
                                    <div className="dtv-info-grid dtv-info-grid--15col">
                                        <div className="row">
                                            <div className="th">산업부문</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">자재그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">중량단위</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                            
                                            <div className="th">세금</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                           
                                            <div className="th">자재통계그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">운송그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">효력일자</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">QM자재권한</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성이름2</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성값4</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름7</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값9</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성이름12</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값14</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">MRP관리자</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>   
                                        </div>
                                        <div className="row">
                                            <div className="th">자재유형</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">제품군</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">부피단위</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                            
                                            <div className="th">최소오더수량</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                           
                                            <div className="th">계정지정그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">적하그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">배치구조</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">클래스종류</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성값2</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성이름5</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값7</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름10</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성값12</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름15</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">조달유형</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>   
                                        </div>
                                        <div className="row">
                                            <div className="th">제상품구분</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">제품계층구조</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">판매조직</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                            
                                            <div className="th">대체단위</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                           
                                            <div className="th">품목범주그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">손익센터</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">생산스케줄러</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">클래스이름</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성이름3</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성값5</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름8</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값10</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성이름13</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값15</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특별조달유형</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>   
                                        </div>
                                        <div className="row">
                                            <div className="th">자재구분</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">품목범주그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">유통경로</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                            
                                            <div className="th">카운터</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                           
                                            <div className="th">자재그룹1</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">평가클래스</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">일정프로파일</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성이름1</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성값3</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성이름6</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값8</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름11</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성값13</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">MRP유형</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">계획전략그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>   
                                        </div>
                                        <div className="row">
                                            <div className="th">기본단위</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">볼륨</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>
                                            <div className="th">플랜트</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                            
                                            <div className="th">분모</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                           
                                            <div className="th">가용성점검</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">오리진그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                         
                                            <div className="th">입고소요일수</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성값1</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                       
                                            <div className="th">특성이름4</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성값6</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성이름9</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">특성값11</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                      
                                            <div className="th">특성이름14</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">계획타임펜스</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>                                     
                                            <div className="th">구매그룹</div>
                                            <div className="td">
                                                <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  
                                            </div>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


           
        </div>
    </div> 
  );
};

export default Page03;
