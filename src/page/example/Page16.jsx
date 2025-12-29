import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Calendar } from 'primereact/calendar';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';

const Page16 = () => {
  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);
  const regions = [
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '대전', value: 'daejeon' },
  ];

    /* 달력 */
  const [date, setDate] = useState(null);
  
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
      ),
    },
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
  const SearchForm = ({
    value,
    setValue,
    selectedCity,
    setSelectedCity,
    cities,
  }) => (
    <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--8col">
        <div className="row">
          <div className="th">
            {' '}
            <label for="firstname5">건설사</label>
          </div>
          <div className="td">
            <Dropdown
            value={selectedCity}
            className="w-full"
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="선택해주세요"
            />
          </div>
          <div className="th">건설현장</div>
          <div className="td">
            <Dropdown
                value={selectedCity}
                className="w-full"
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="선택해주세요"
                />
          </div>
          <div className="th">영업그룹</div>
          <div className="td">
            <Dropdown
              value={selectedCity}
              className="w-full"
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="선택해주세요"
            />
          </div>
          <div className="th">사업장</div>
          <div className="td">
            <Dropdown
              value={selectedCity}
              className="w-full"
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="선택해주세요"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card height-01">
      {/* 공통 : 타이틀영역 */}
      <div className="title-container">
        <div className="flex gap-2">
              <h2>주문관리 &gt; 주문입력 </h2>
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
          <button
            className="layout-BreadCrumb-button"
            onClick={() => setVisibleRight(true)}
          >
            <i className="pi pi-exclamation-circle" />
          </button>
        </div>
      </div>

      {/* 공통 : 업무영역에 대한 도움말 사이드바 */}
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <h2> 업무영역별 도움말R</h2>
        <span>이미지 + 해당화면 업무설명</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>

      {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
      <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">
       

        {/* 테이블 형태 */}
        {/* 공통 : 그리드 상단 버튼  */}
        <div className="hugreen_aggridbtn_hwrap">
          <div className="flex">
            <span className="InfoText"> 하역지 설정을 필수로 입력해주세요.</span>
          </div>
          <div className="flex gap-2">
            <Button label="엑셀" className="btn-28-sec" severity="secondary" outlined />
            <Button label="제품추가" className="btn-28-sec" severity="secondary" outlined />
            <Button label="엑셀 업로드" className="btn-28-sec" severity="secondary" outlined />
            <Button label="저장" className="btn-28-master" severity="secondary" outlined />
          </div>
        </div>

        <div className="flex w-full">
            <div className="dtv-info-grid dtv-info-grid--4col-etc2">
            <div className="row">
                <div className="th">주문일</div>
                <div className="td">
                    <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />
                </div>

                <div className="th">납기요청일</div>
                <div className="td">
                   <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />
                </div>
            </div>
             <div className="row">
                <div className="th">하역지</div>
                <div className="td gap-2 flex flex-col md:flex-row !items-start">
                    <InputText value={value} className="w-48" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                    <InputText value={value} className="w-full" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                    <InputText value={value} className="w-28" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                    <Button label="하역지변경" className='in' outlined /> 
                </div>
                 <div className="th">현장선택</div>
                <div className="td gap-2">
                    <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                      placeholder="선택해주세요"/>    
                </div>
            </div>

           
            </div>
        </div>


        {/* 공통 : 그리드 상단 버튼  */}
        <div className="hugreen_aggridbtn_hwrap">
          <div className="flex">
            <span className="NumTitle"> 주문유형</span>
            <div className='flex'>
                <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
            </div>
          </div>
          <div className="flex gap-2">
            <Button label="시뮬레이션" className="btn-28-master" severity="secondary" outlined />
          </div>
        </div>
        {/* 공통 : ag그리드  */}
        <div className="hugreen_aggrid_hwrap">
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
  );
};

export default Page16;
