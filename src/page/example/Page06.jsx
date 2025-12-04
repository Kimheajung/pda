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
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from "primereact/accordion";
import { TabView, TabPanel } from 'primereact/tabview';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';



const Page05 = () => {

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
    <div className="card height-03">  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>코드관리 &gt; 제품코드생성(프로파일) </h2>
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
                <div class="flex gap-4 w-full flex-col h-full md:flex-col gap-4 md:flex-nowrap">
                   <div class="flex-[0.5] md:flex-[0.5]  md:min-h-0">
                        <div className='hugreen_aggrid_hwrap'>
                            <div class="flex gap-4 w-full h-full flex-col md:flex-row">
                                <div class="w-full flex-1 md:!w-1/5" >
                                    {/* 공통 : 그리드 상단 버튼  */}
                                    <div className="hugreen_aggridbtn_hwrap">
                                        <div className="flex">
                                        <span className="NumTitle"> 기본정보</span>
                                        </div>
                                    </div>
                                    <div className="dtv-info-grid dtv-info-grid--2col-etc3">
                                        <div className="row">
                                            <div className="th">LV1</div>
                                            <div className="td">
                                                <InputText value={value}  onChange={(e) => setValue(e.target.value)}  placeholder=""/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV2</div>
                                            <div className="td">
                                                <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV3</div>
                                            <div className="td">
                                                <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV4(종류)</div>
                                            <div className="td">
                                                <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">LV5(금형)</div>
                                            <div className="td">
                                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                            </div>
                                        </div>
                                         <div className="row">
                                            <div className="th">프로파일색상</div>
                                            <div className="td">
                                                <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                placeholder="선택해주세요"/>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex-1 md:!w-1/5" >
                                    <div className='flex-row'>
                                        <div className='flex flex-wrap'>
                                            {/* 공통 : 그리드 상단 버튼  */}
                                            <div className="hugreen_aggridbtn_hwrap">
                                                <div className="flex">
                                                <span className="NumTitle"> 공압출색상</span>
                                                </div>
                                            </div>
                                            <div className="dtv-info-grid dtv-info-grid--2col-etc3">
                                                <div className="row">
                                                    <div className="th">레일</div>
                                                    <div className="td">
                                                        <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                        placeholder="선택해주세요"/>                                         
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="th">외부ASA</div>
                                                    <div className="td">
                                                        <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                                        placeholder="선택해주세요"/>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap'>
                                            {/* 공통 : 그리드 상단 버튼  */}
                                            <div className="hugreen_aggridbtn_hwrap">
                                                <div className="flex">
                                                <span className="NumTitle"> 시트 Type A</span>
                                                </div>
                                                 <div className="flex gap-2"> 
                                                   <div className="flex flex-wrap gap-2">
                                                        <div className="flex align-items-center">
                                                        <RadioButton
                                                            inputId="ingredient1"
                                                            name="pizza"
                                                            value="Cheese"
                                                            onChange={(e) => setIngredient(e.value)}
                                                            checked={ingredient === 'Cheese'}
                                                        />
                                                        <label htmlFor="ingredient1" className="ml-2">
                                                            넓은면
                                                        </label>
                                                        </div>
                                                        <div className="flex align-items-center">
                                                        <RadioButton
                                                            inputId="ingredient2"
                                                            name="pizza"
                                                            value="Mushroom"
                                                            onChange={(e) => setIngredient(e.value)}
                                                            checked={ingredient === 'Mushroom'}
                                                        />
                                                        <label htmlFor="ingredient2" className="ml-2">
                                                            좁은면
                                                        </label>
                                                        </div>
                                                        <div className="flex align-items-center">
                                                        <RadioButton
                                                            inputId="ingredient2"
                                                            name="pizza"
                                                            value="Mushroom"
                                                            onChange={(e) => setIngredient(e.value)}
                                                            checked={ingredient === 'Mushroom'}
                                                        />
                                                        <label htmlFor="ingredient2" className="ml-2">
                                                            양면
                                                        </label>
                                                        </div>
                                                    </div>  
                                                 </div>
                                            </div>
                                            <div className="dtv-info-grid dtv-info-grid--2col-etc3">
                                                <div className="row">
                                                    <div className="th">넓은</div>
                                                    <div className="td">
                                                        <InputText  className='w-full' value={value} onChange={(e) => setValue(e.target.value)}  placeholder=""/>                                         
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="th">좁은</div>
                                                    <div className="td">
                                                        <InputText  className='w-full' value={value} onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-full md:flex-2 md:!w-2/5 min-w-full md:min-w-0">
                                    <div className="hugreen_aggridbtn_hwrap">
                                        <div className="flex">
                                        <span className="NumTitle"> 미리보기</span>
                                        </div>
                                        <div className="flex gap-2"> 
                                            <Button label="코드생성" className="btn-28-sec" severity="secondary" outlined />
                                            <Button label="삽입" className="btn-28-sec" severity="secondary" outlined />
                                            <Button label="미생성정보조회" className="btn-28-sec" severity="secondary" outlined />
                                            <Button label="초기회" className="btn-28-master" severity="secondary" outlined />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap block border border-gray-200 bg-[#fff] p-4 rounded'>
                                         <div className="flex w-full">
                                            <div className="grid-view w-full">
                                            <div className="row">
                                                <div className="th">LV코드</div>
                                                <div className="td">
                                                <InputText
                                                    className="w-full"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    placeholder="610006110061180999"
                                                />{' '}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="th">제품명</div>
                                                <div className="td">
                                                <InputText
                                                    className="w-full"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    placeholder="FSP-130/S"
                                                />{' '}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="th">White제품</div>
                                                <div className="td">
                                                <InputText
                                                    className="w-full"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    placeholder="FSP-130/W"
                                                />{' '}
                                                </div>
                                            </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-[0.5] md:flex-[0.5] min-h-[400px] md:min-h-0">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                            <div className="flex">
                            <span className="NumTitle"> 생성코드</span>
                            </div>
                        </div>
                        <div className='hugreen_aggrid_hwrap' >
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

export default Page05;
