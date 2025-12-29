import { useCallback, useMemo, useRef, useState, useEffect  } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Calendar } from 'primereact/calendar';
import { Tooltip } from 'primereact/tooltip';
import { TabView, TabPanel } from 'primereact/tabview';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';



const Page01 = () => {

    //툴팁
  const bellRef = useRef(null);  
  
  /* 달력 */
  const [date, setDate] = useState(null);
  
  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);

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

  /* 스플리터 모바일 대응 */
  const [layout, setLayout] = useState('horizontal');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLayout('vertical');  // 모바일: 위아래
      } else {
        setLayout('horizontal'); // PC: 좌우
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // 검색영역 폼 
  const SearchForm = ({ value, setValue, selectedCity, setSelectedCity, cities }) => (
    

     <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--6col">
      
        <div className="row">
          <div className='th'>조회조건</div>
          <div className='td'>
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
                    담당자
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
                    전체
                  </label>
                </div>
              </div>
          </div>
          <div className="th"> <label for="firstname5">건설사</label></div>
          <div className="td gap-2 merge-3 w-full flex md:flex-nowrap">
            <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>
            <Button label="검색" className='in' outlined />
            <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
              placeholder="선택해주세요"/>                  
          </div>
        </div>
        <div className="row">
          <div className="th">팀</div>
          <div className="td">
            <Dropdown value={selectedCity}  className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
               placeholder="선택해주세요"/>
          </div>
          <div className="th">종결</div>
          <div className="td">
            <Dropdown value={selectedCity}  className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
               placeholder="선택해주세요"/>
          </div>
          <div className="th">사용자</div>
          <div className="td">
           김어준
          </div>
        </div>

        
        
      </div>
    </div>
   
  );


  return (
    <div className="card height"> 
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-4">
              <h2>건설현장 &gt; 현장정보등록 </h2>
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
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <h2> 업무영역별 도움말R</h2>
          <span>이미지 + 해당화면 업무설명</span>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Sidebar>


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex flex-1  flex-wrap md:flex-row">
           
            {/* 공통 검색영역(PC+모바일대응) */}
            <div className="hugreen_grid flex-1 flex flex-wrap">
              {/* PC (md 이상) */}
              <div className="hugreen_searchwrap hidden md:flex transition-all duration-300">
                <div className="flex w-[95%]">
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
                  
                </div>
                <div className="flex gap-2"> 
                  <Button label="엑셀 다운로드" className="btn-28-sec" severity="secondary" outlined /> 
                  <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                  <Button label="임시등록" className="btn-28-master" severity="secondary" outlined /> 
              </div>
            </div>

           
            {/* 공통 : 그리드 영역  */}
            <div className="w-full h-full">
            <Splitter className="w-full h-full" layout={layout}>
              <SplitterPanel size={30} minSize={20} className="flex items-start" >
                  {/* 공통 : ag그리드  */}
                    <div className="hugreen_aggrid_hwrap"  style={{height: "500px"}}>
                     그리드 영역
                    </div>
              </SplitterPanel>
              <SplitterPanel size={70} minSize={20} className="flex items-start">
                <div className="hugreen_wrap">
                  {/* 공통 : 탭 그리드  */}
                   <TabView className="hugreen-tabview" activeIndex={0}> 
                      <TabPanel header="기본정보">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="flex justify-end mb-2"> 
                          <Button label="수정" className="btn-28-sec" severity="secondary" outlined /> 
                        </div>

                         {/* 테이블 형태 */}
                        <div className="flex w-full">
                        <div className="dtv-info-grid dtv-info-grid--6col">
                            <div className="row">
                              <div className="th">건설사</div>
                              <div className="td">
                                <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="건설사"/>
                              </div>
                              <div className="th">확정일자</div>
                              <div className="td">
                                <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">영업담당자</div>
                              <div className="td">
                                 <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="김양곤"/>
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">건설현장명</div>
                              <div className="td">
                                <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="건설사"/>
                              </div>
                              <div className="th">건설현장유형</div>
                              <div className="td">
                                <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>  
                              </div>
                              <div className="th">시공담당자</div>
                              <div className="td">
                                 <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="김양곤"/>
                              </div>
                            </div>

                             <div className="row">
                             <div className="th">건설현장주소</div>
                              <div className="td gap-2 merge-3">
                                <InputText value={value} className="w-28" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                                <InputText value={value} className="w-full" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                                <Button label="선택" className='in' outlined />
                              </div>
                              <div className="th">세대수</div>
                              <div className="td">
                                 <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">프로젝트 기간</div>
                              <div className="td gap-2">
                                <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              <span className='p-1'> - </span>
                              <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />  
                              </div>
                              <div className="th">하자보수기간</div>
                              <div className="td  merge-3">
                                 <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              <span className='p-1'> - </span>
                              <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon />  
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">정산일자</div>
                              <div className="td">
                                 <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">현장종료일자</div>
                              <div className="td">
                                 <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">진행상태</div>
                              <div className="td">
                                 <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/> 
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">파트</div>
                              <div className="td">
                                 <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/> 
                              </div>
                              <div className="th">현장자재통제</div>
                              <div className="td">
                                  <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/> 
                              </div>
                              <div className="th">현장한도관리</div>
                              <div className="td">
                                 <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/> 
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">특이사항</div>
                              <div className="td merge-5">
                                  <textarea className="p-inputtextarea w-full h-[180px]" placeholder="입력해주세요" data-pc-name="inputtextarea" data-pc-section="root"></textarea>
                              </div>
                            </div>

                             <div className="row">
                             <div className="th">주문종료일자</div>
                              <div className="td">
                                 <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">현장개설일</div>
                              <div className="td">
                                   <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">분양일</div>
                              <div className="td">
                                 <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                            </div>

                            <div className="row">
                             <div className="th">자재투입예상</div>
                              <div className="td">
                                 <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                              <span className='p-1'> - </span>
                              <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">준공일</div>
                              <div className="td">
                                   <Calendar value={date} className="w-38" onChange={(e) => setDate(e.value)} showIcon /> 
                              </div>
                              <div className="th">영업그룹</div>
                              <div className="td">
                                 <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              </div>
                            </div>

                             <div className="row">
                             <div className="th">현장담당자</div>
                              <div className="td">
                                <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              </div>
                              <div className="th">현장연락처</div>
                              <div className="td">
                                   <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              </div>
                              <div className="th">환기창키트</div>
                              <div className="td">
                                 <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                  placeholder="선택해주세요"/>  
                              </div>
                            </div>

                            
                          </div>
                        </div>

                      </TabPanel>
                      <TabPanel header="계약현황">
                         {/* 공통 : 그리드 상단 버튼  */}
                        <div className="flex justify-end mb-2"> 
                          <Button label="저장" className="btn-28-master" severity="secondary" outlined /> 
                        </div>

                        {/* 공통 : ag그리드  */}
                        <div className="hugreen_aggrid_hwrap" style={{height: "500px"}}>
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
                      </TabPanel>
                      <TabPanel header="외주계약">
                         {/* 공통 : 그리드 상단 버튼  */}
                        <div className="flex gap-2 justify-end mb-2"> 
                          <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          <Button label="저장" className="btn-28-master" severity="secondary" outlined /> 
                        </div>

                        {/* 공통 : ag그리드  */}
                        <div className="hugreen_aggrid_hwrap">
                        그리드 영역
                        </div>
                      </TabPanel>
                      <TabPanel header="기성청구예정">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="flex justify-end gap-2 mb-2"> 
                          <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          <Button label="저장" className="btn-28-master" severity="secondary" outlined /> 
                        </div>

                          그리드
                      </TabPanel>
                      <TabPanel header="수주보고첨부">
                        {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                          <div className="flex">
                            <span className="InfoText_Point"> 수주보고서,도급계약서,외주계약서는 반드시첨부</span>
                          </div>
                          <div className="flex gap-2"> 
                            <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          </div>
                        </div>


                       <div class="flex gap-4 w-full h-full flex-col md:flex-row">
                          <div class="w-full flex-1 md:!w-1/2">
                             <div className="flex w-full">
                                <div className="dtv-info-grid dtv-info-grid--2col-etc">
                                    <div className="row">
                                      <div className="th">건설사명</div>
                                      <div className="td">
                                        (주)KR산업
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">건설현장명</div>
                                      <div className="td">
                                        KR산업 성남복정1지구 B3BL PL
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">계약차수</div>
                                      <div className="td">
                                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                          placeholder="선택해주세요"/>  
                                      </div>
                                    </div>

                                  </div>
                                </div>
                          </div>
                          <div class="w-full flex-1 md:!w-2/3 border border-gray-300 p-4">
                            <div class="favorite-list">
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel header="도급계약첨부">
                           {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                          <div className="flex">
                            <span className="InfoText_Point"> 수주보고서,도급계약서,외주계약서는 반드시첨부</span>
                          </div>
                          <div className="flex gap-2"> 
                            <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          </div>
                        </div>


                       <div class="flex gap-4 w-full h-full flex-col md:flex-row">
                          <div class="w-full flex-1 md:!w-1/3">
                             <div className="flex w-full">
                                <div className="dtv-info-grid dtv-info-grid--2col-etc">
                                    <div className="row">
                                      <div className="th">건설사명</div>
                                      <div className="td">
                                        (주)KR산업
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">건설현장명</div>
                                      <div className="td">
                                        KR산업 성남복정1지구 B3BL PL
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">계약차수</div>
                                      <div className="td">
                                        <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                          placeholder="선택해주세요"/>  
                                      </div>
                                    </div>

                                  </div>
                                </div>
                          </div>
                          <div class="w-full flex-1 md:!w-2/3 border border-gray-300 p-4">
                            <div class="favorite-list">
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel header="외주계약첨부">
                          {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                          <div className="flex">
                            <span className="InfoText_Point"> 수주보고서,도급계약서,외주계약서는 반드시첨부</span>
                          </div>
                          <div className="flex gap-2"> 
                            <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          </div>
                        </div>


                       <div class="flex gap-4 w-full h-full flex-col md:flex-row">
                          <div class="w-full flex-1 md:!w-1/3">
                             <div className="flex w-full">
                                <div className="dtv-info-grid dtv-info-grid--2col-etc">
                                    <div className="row">
                                      <div className="th">건설사명</div>
                                      <div className="td">
                                        (주)KR산업
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">건설현장명</div>
                                      <div className="td">
                                        KR산업 성남복정1지구 B3BL PL
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">계약차수</div>
                                      <div className="td">
                                        <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                          placeholder="선택해주세요"/>  
                                      </div>
                                    </div>

                                  </div>
                                </div>
                          </div>
                          <div class="w-full flex-1 md:!w-2/3 border border-gray-300 p-4">
                            <div class="favorite-list">
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">(주)KR산업_KR산업 성남복정1지구 B3BL PL_[수주보고서] KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                                <div class="favorite-item">KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel header="기타문서첨부">
                          {/* 공통 : 그리드 상단 버튼  */}
                        <div className="hugreen_aggridbtn_hwrap">
                          <div className="flex">
                            <span className="InfoText_Point"> 수주보고서,도급계약서,외주계약서는 반드시첨부</span>
                          </div>
                          <div className="flex gap-2"> 
                            <Button label="추가" className="btn-28-sec" severity="secondary" outlined /> 
                          </div>
                        </div>


                       <div class="flex gap-4 w-full h-full flex-col md:flex-row">
                          <div class="w-full flex-1 md:!w-1/3">
                             <div className="flex w-full">
                                <div className="dtv-info-grid dtv-info-grid--2col-etc">
                                    <div className="row">
                                      <div className="th">건설사명</div>
                                      <div className="td">
                                        (주)KR산업
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">건설현장명</div>
                                      <div className="td">
                                        KR산업 성남복정1지구 B3BL PL
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="th">계약차수</div>
                                      <div className="td">
                                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                          placeholder="선택해주세요"/>  
                                      </div>
                                    </div>

                                  </div>
                                </div>
                          </div>
                          <div class="w-full flex-1 md:!w-2/3 border border-gray-300 p-4">
                            <div class="favorite-list">
                                <div class="favorite-item">KR산업 성남복정(사장님 결재完).pdf
                                  <button
                                    class="favorite-del-btn p-button-text p-button-plain no-theme"
                                    data-pc-name="button"
                                    data-pc-section="root">
                                        <span class="pi pi-times" data-pc-section="icon"></span>
                                        <span data-pc-section="label">&nbsp;</span>
                                    </button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                  </TabView>
                 
                </div>
              </SplitterPanel>
            </Splitter>
            </div>

           
        </div>
    </div>
    
    

  );
};

export default Page01;
