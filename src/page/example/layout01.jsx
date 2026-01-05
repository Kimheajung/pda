import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { Tooltip } from 'primereact/tooltip';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from "primereact/overlaypanel";
import { Divider } from "primereact/divider";
import {
  DtPicker,
  FormAutoComplete,
  FormAutoCompleteMulti,
  FormDropdown,
  FormEditor,
  FormInputNumber,
  FormInputText,
  FormPassword,
  FormTextArea,
  MonthPicker,
  YearPicker,
} from '../../components/form/UseFormControl';


  //카드형 리스트
  const PAGE_SIZE = 5;
  // 더미 데이터 (API 연동 전용)
  const MOCK_DATA = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    datetime: "2025.12.22 14:06",
    product: "PSF-120G",
    color: "WH",
    qty: 190,
    length: "8.0",
    deliveryDate: "2025.11.01",
    deliveryTime: "08:00",
    agency: "아키원(라인아산)",
    site: "상시",
    machine: "8호기",
  }));


const Layout01 = () => {

  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);

    //툴팁
  const bellRef = useRef(null);

  //인풋
 const [text, setText] = useState('');



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



  /* 다이얼로그 팝업 */
const [visible2, setVisible2] = useState(false); 
const [visible3, setVisible3] = useState(false);
const [dialogClosing, setDialogClosing] = useState(false);
const [activeDialog, setActiveDialog] = useState(null);
  const footerContent2 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible2(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible2(false)} autoFocus />
    </div>
  );
    const footerContent3 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible3(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible3(false)} autoFocus />
    </div>
  );

const requestCloseDialog = () => {
  if (dialogClosing) return;

  setDialogClosing(true);

  setTimeout(() => {
    if (activeDialog === 'detail') {
      setVisible2(false);
    }

    if (activeDialog === 'barcode') {
      setVisible3(false);
    }

    setDialogClosing(false);
    setActiveDialog(null);
  }, 300); // slide 애니메이션 시간
};

  //다이얼로그
  const dialogTitle = '바코드 입력화면';
  const dialogHeader = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="p-link text-gray-600"
         onClick={requestCloseDialog}
      >
        <i className="pi pi-arrow-left text-mg" />
      </button>

      <span className="font-semibold text-lg truncate" >
        {dialogTitle}
      </span>
    </div>
  );


  
  // 검색영역 폼 
  const SearchForm = ({ value, setValue, selectedCity, setSelectedCity, cities }) => (
    
    <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--8col">
      
        <div className="row">
          <div className="th"> <label htmlFor="firstname5">오더일자</label></div>
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
          <div className="th">납품요청일</div>
          <div className="td">
            <Dropdown value={selectedCity}  className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="선택해주세요"/>
          </div>
            <div className="th">작업대상설정</div>
            <div className="td flex gap-2">
              <div className="flex align-items-center">
                  <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                  <label htmlFor="ingredient1">주문</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                  <label htmlFor="ingredient2">납품번호</label>
                </div>
            </div>
        </div>

        
        
      </div>
    </div>


  );
  
  //테스트
 const opRef = useRef(null);
  const [open, setOpen] = useState(false);

  const HEADER_HEIGHT_REM = 18; // 106px 기준 (14px rem)

  const openFilter = (e) => {
    setOpen(true);
    opRef.current.show(e);
  };

  const closeFilter = () => {
    setOpen(false);
    opRef.current.hide();
  };
  

  const [mode, setMode] = useState("1개월");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tradeType, setTradeType] = useState(null);
  const [payMethod, setPayMethod] = useState(null);

  const modes = ["1개월", "1년", "기간 설정"];

  const tradeTypeOptions = [
    { label: "전체", value: "all" },
    { label: "입금", value: "in" },
    { label: "출금", value: "out" },
  ];

  const payMethodOptions = [
    { label: "전체", value: "all" },
    { label: "카드", value: "card" },
    { label: "계좌", value: "account" },
  ];

  const canSearch = true;




 const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expandedId, setExpandedId] = useState(MOCK_DATA[0].id);
  const loaderRef = useRef(null);

  /* ===============================
     Infinite Scroll
  =============================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, MOCK_DATA.length)
          );
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);
  

  return (
    <div className="card">  


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

          <div className="hugreen_mobile_wrap">
            <TabView className="hugreen-tabview" activeIndex={0}>
                <TabPanel header="입고내역조회">
                  {/* 공통 검색영역 */}
                  <div className="flex w-full">
                    <div className="grid-searchwrap grid-searchwrap--4col">                    
                      <div className="row">
                        <div className="th"> <label htmlFor="firstname5">작업일자</label></div>
                        <div className="td merge-3 flex items-center !justify-between gap-2">
                          <Calendar
                            value={toDate}
                            onChange={(e) => setToDate(e.value)}
                            dateFormat="yy.mm.dd"
                            showIcon
                            placeholder='2026.01.05'
                            className="w-full"
                          /> 
                          <Button
                            icon="pi pi-sliders-v"
                            onClick={openFilter}
                            text
                            security='secondary'
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== 검색필터 Dialog ===== */}
                  {open && (
                    <div
                      className="filter-dim"
                      onClick={closeFilter}
                      style={{ top: `${HEADER_HEIGHT_REM}rem` }}
                    />
                  )}
                  <OverlayPanel
                    ref={opRef}
                    className="filter-overlay"
                    showCloseIcon={false}
                    dismissable
                  >

                    {/* 바디 */}
                    <div className="filter-overlay__body">
                      
                      <div className="flex w-full">
                        <div className="grid-searchwrap grid-searchwrap--4col">
                        
                          <div className="row">
                            <div className="th"> <label htmlFor="firstname5">지시번호</label></div>
                            <div className="td merge-3 flex items-center !justify-between gap-2">
                            <Dropdown
                              value={tradeType}
                              options={tradeTypeOptions}
                              onChange={(e) => setTradeType(e.value)}
                              className="w-full"
                            />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        label="조회"
                        disabled={!canSearch}
                        className="filter-overlay__search-btn"
                        severity={canSearch ? "success" : "secondary"}
                      />
                    </div>
                  </OverlayPanel>
                  
                  <div className="wrap">
                    {/* 공통 : 그리드 상단 버튼  */}
                    <div className="hugreen_aggridbtn_hwrap">
                      <div className="flex">
                        <span className="NumText"> 조회결과</span>
                        <p className="totalNumText" >총&nbsp;<span>18,203</span>건</p>
                      </div>
                      <div className="flex gap-2"> 
                        <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                        <Button label="3.모달 - 상세화면" className="btn-28-master" onClick={() => {
                          setActiveDialog('detail');
                          setVisible2(true);
                        }} />
                        <Dialog
                          header={dialogHeader}
                          visible={visible2}
                          modal
                          blockScroll
                          resizable={false}
                          footer={footerContent2}
                          closable={true}
                          className={classNames(
                            'user-dialog slide-dialog',
                            { 'slide-out-right': dialogClosing }
                          )}
                          onHide={requestCloseDialog}   // ✅ 절대 setVisible 직접 금지
                        >
                            
                            {/* 공통 : ag그리드  */}
                            <div className="flex w-full" >
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
                        </Dialog> 
                      </div>
                    </div>
                    {/* 공통 : 카드형 그리드  */}
                    <div className="hugreen_aggrid_hwrap">

    <div className="incoming-list">
      {MOCK_DATA.slice(0, visibleCount).map((item) => {
        const isOpen = expandedId === item.id;

        return (
          <div key={item.id} className="incoming-card">
            {/* ===== Header ===== */}
            <div className="incoming-card__header">
              <span className="date">{item.datetime}</span>
              <Button
                icon="pi pi-chevron-down"
                text
                rounded
                className={classNames("toggle-btn", { open: isOpen })}
                onClick={() =>
                  setExpandedId(isOpen ? null : item.id)
                }
              />
            </div>

            {/* ===== Title ===== */}
            <div className="incoming-card__title">{item.product}</div>

            {/* ===== Summary ===== */}
            <div className="incoming-card__summary">
              <span>색상 {item.color}</span>
              <span>수량 {item.qty}</span>
              <span>길이 {item.length}</span>
              <span>
                {item.deliveryDate} {item.deliveryTime}
              </span>
            </div>

            {/* ===== Expand Area (항상 렌더) ===== */}
            <div
              className={classNames("incoming-card__expand", {
                "is-open": isOpen,
              })}
            >
              <Divider />

              <div className="incoming-card__detail">
                <div>
                  <label>대리점명</label>
                  <span>{item.agency}</span>
                </div>
                <div>
                  <label>현장명</label>
                  <span>{item.site}</span>
                </div>
                <div>
                  <label>호기</label>
                  <span>{item.machine}</span>
                </div>
              </div>

              <div className="incoming-card__actions">
                <Button label="초기화" outlined />
                <Button label="제거" outlined severity="danger" />
                <Button label="입고확정" />
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== Infinite Scroll Trigger ===== */}
      <div ref={loaderRef} className="incoming-list__loader" />
    </div>
                    </div>
                  </div>
                 

                  {/* 공통 : 스캔버튼  */}
                  <button className="scan-button" onClick={() => {
                    setActiveDialog('barcode');
                    setVisible3(true);
                  }}>
                    <i className="pi pi-barcode text-xl"></i>
                  </button>

                  <Dialog
                    header={dialogHeader}
                    visible={visible3}
                    modal
                    blockScroll
                    resizable={false}
                    footer={footerContent3}
                    closable={true}
                    className={classNames(
                      'user-dialog slide-dialog',
                      { 'slide-out-right': dialogClosing }
                    )}
                    onHide={requestCloseDialog}   
                  >
                      {/* 공통 : ag그리드  */}
                      <div className="flex w-full">
                        <div className="grid-view">
                          <div className='sub-scan'></div>
                          <p className='sub-tit'>바코드 및 속성정보</p>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">품명명</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">규격</div>
                              <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>

                          <p className='sub-tit mt-4'>업체 및 현장주소 정보</p>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                  </Dialog> 



                </TabPanel>
                <TabPanel header="자가생산입고(개별)">
                  {/* 공통 검색영역 */}
                  <div className="flex w-full">
                    <div className="grid-searchwrap grid-searchwrap--4col">                    
                      <div className="row">
                        <div className="th"> <label htmlFor="firstname5">작업일자</label></div>
                        <div className="td merge-3 flex items-center !justify-between gap-2">
                          <Calendar
                            value={toDate}
                            onChange={(e) => setToDate(e.value)}
                            dateFormat="yy.mm.dd"
                            showIcon
                            placeholder='2026.01.05'
                            className="w-full"
                          /> 
                          <Button
                            icon="pi pi-sliders-v"
                            onClick={openFilter}
                            text
                            security='secondary'
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== 검색필터 Dialog ===== */}
                  {open && (
                    <div
                      className="filter-dim"
                      onClick={closeFilter}
                      style={{ top: `${HEADER_HEIGHT_REM}rem` }}
                    />
                  )}
                  <OverlayPanel
                    ref={opRef}
                    className="filter-overlay"
                    showCloseIcon={false}
                    dismissable
                  >

                    {/* 바디 */}
                    <div className="filter-overlay__body">
                      
                      <div className="flex w-full">
                        <div className="grid-searchwrap grid-searchwrap--4col">
                        
                          <div className="row">
                            <div className="th"> <label htmlFor="firstname5">지시번호</label></div>
                            <div className="td merge-3 flex items-center !justify-between gap-2">
                            <Dropdown
                              value={tradeType}
                              options={tradeTypeOptions}
                              onChange={(e) => setTradeType(e.value)}
                              className="w-full"
                            />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        label="조회"
                        disabled={!canSearch}
                        className="filter-overlay__search-btn"
                        severity={canSearch ? "success" : "secondary"}
                      />
                    </div>
                  </OverlayPanel>

                  
                  <div className="wrap">
                    {/* 공통 : 그리드 상단 버튼  */}
                    <div className="hugreen_aggridbtn_hwrap">
                      <div className="flex">
                        <span className="NumText"> 조회결과</span>
                        <p className="totalNumText" >총&nbsp;<span>0</span>건</p>
                      </div>
                    </div>
                    {/* 공통 : 카드형 그리드  */}
                    <div className="hugreen_aggrid_hwrap">
                      
                      {/* 공통 : 제품이 없을 경우  */}
                      <div className="incoming-empty">
                        <div className="incoming-empty__icon">
                          <i className="pi pi-inbox" />
                        </div>

                        <div className="incoming-empty__title">입고된 제품이 없습니다.</div>
                        <div className="incoming-empty__desc">제품을 스캔해주세요</div>

                      </div>
                    </div>
                  </div>

                  {/* 공통 : 스캔버튼  */}
                  <button className="scan-button" onClick={() => {
                    setActiveDialog('barcode');
                    setVisible3(true);
                  }}>
                    <i className="pi pi-barcode text-xl"></i>
                  </button>

                  <Dialog
                    header={dialogHeader}
                    visible={visible3}
                    modal
                    blockScroll
                    resizable={false}
                    footer={footerContent3}
                    closable={true}
                    className={classNames(
                      'user-dialog slide-dialog',
                      { 'slide-out-right': dialogClosing }
                    )}
                    onHide={requestCloseDialog}   
                  >
                      {/* 공통 : ag그리드  */}
                      <div className="flex w-full">
                        <div className="grid-view">
                          <div className='sub-scan'></div>
                          <p className='sub-tit'>바코드 및 속성정보</p>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">품명명</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">규격</div>
                              <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>

                          <p className='sub-tit mt-4'>업체 및 현장주소 정보</p>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="th">바코드</div>
                            <div className="td">
                              <InputText
                                className="w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="선택해주세요"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                  </Dialog> 

                </TabPanel>
                <TabPanel header="자가생산입고(일괄)">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
          </div>

          


        </div>      
    </div>
  );
};

export default Layout01;
