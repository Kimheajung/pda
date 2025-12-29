import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Accordion, AccordionTab } from 'primereact/accordion';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';

const Page10 = () => {
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

  /*input, combobox , radiobutton */
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
      <div className="grid-searchwrap grid-searchwrap--6col">
        <div className="row">
          <div className="th">
            {' '}
            <label for="firstname5">작업자정보</label>
          </div>
          <div className="td">
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full"
              placeholder="홍길동"
            />
          </div>
          <div className="th">공정</div>
          <div className="td">
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full"
              placeholder="전체"
            />
          </div>
          <div className="th">대상 설정</div>
          <div className="td">
            <Button label="작업대상 설정" className='in' severity="secondary" outlined />  
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
              <h2>자가생산관리 &gt; 생산현황(B) </h2>
          {/* 공통 : 메뉴별 즐겿자기 */}
          <Button
            icon={filled ? 'pi pi-star-fill' : 'pi pi-star'}
            className="layout-Favorite-button"
            onClick={() => setFilled((prev) => !prev)}
            aria-label="Favorite"
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
      <div className="hugreen_grid flex flex-1 flex-wrap md:flex-row">
        {/* 공통 검색영역(PC+모바일대응) */}
        <div className="hugreen_grid flex-1 flex flex-wrap">
          {/* PC (md 이상) */}
          <div className="hugreen_searchwrap hidden md:flex transition-all duration-300">
            <div className="flex">
              <SearchForm
                value={value}
                setValue={setValue}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                cities={cities}
              />
            </div>
            <div className="flex search-btn-wrap">
              <Button label="검색" text className="search-btn" />
            </div>
          </div>

          {/* 모바일 (sm 이하) */}
          <div className="w-full md:hidden">
            <div className="hugreen_searchwrap overflow-hidden">
              <button
                type="button"
                className="flex m_filter_text"
                onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
              >
                {activeIndex === 0 ? '검색필터 숨기기' : '검색필터 펼치기'}
              </button>

              {/* Accordion Content with Smooth Animation */}
              <div
                className={`overflow-hidden transition-all duration-300  ${
                  activeIndex === 0 ? 'max-h-[500px] p-0' : 'max-h-0 p-0'
                } `}
              >
                <div className="flex">
                  <SearchForm
                    value={value}
                    setValue={setValue}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities}
                  />
                </div>
                <div className="flex search-btn-wrap">
                  <Button label="검색" text className="search-btn" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 테이블 형태 */}
        <div className="flex w-full">
          <div className="dtv-info-grid dtv-info-grid--5col">
            <div className="row">
              <div className="th">오더/F일자</div>
              <div className="td">
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                <span className='p-1'> - </span>
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />  
              </div>
              <div className="th">주문일자</div>
              <div className="td">
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                <span className='p-1'> - </span>
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />  
              </div>

              <div className="th">납품일자</div>
              <div className="td">
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                <span className='p-1'> - </span>
                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />  
              </div>

              <div className="th">판매오더</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>

               <div className="th">대리점</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
            </div>

            <div className="row">
              <div className="th">현장명</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              <div className="th">하역지</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              <div className="th">공정구분</div>
              <div className="td">
                <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
              placeholder=""/>
              </div>
              <div className="th">금형</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              <div className="th">절단길이</div>
              <div className="td">
                <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
              placeholder=""/>
              </div>
            </div>

             <div className="row">
              <div className="th">시트명</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              <div className="th">바코드NO</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              <div className="th">생산오더</div>
              <div className="td"><InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/></div>
              
            </div>


          </div>
        </div>

        {/* 공통 : 그리드 상단 버튼  */}
        <div className="hugreen_aggridbtn_hwrap">
          <div className="flex">
            <span className="NumTitle"> 생산년월</span>
            <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />
          </div>
          <div className="flex gap-2">
            <Button
              label="초기화"
              className="btn-28-sec"
              severity="secondary"
              outlined
            />
            <Button
              label="저장"
              className="btn-28-master"
              severity="secondary"
              outlined
            />
          </div>
        </div>
        {/* 공통 : ag그리드  */}
        <div className="hugreen_aggrid_hwrap">그리드 들어오는 영역</div>

        <div className="hugreen_space"></div>
      </div>
    </div>
  );
};

export default Page10;
