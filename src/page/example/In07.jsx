import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { SelectButton } from 'primereact/selectbutton';
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { Sidebar } from 'primereact/sidebar';
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
    barcode: "P1902222049",
    status: "반영완료",
    go: "1147513",
  }));

  /* 다이얼로그 타입 */
const DIALOG = {
  DETAIL: 'detail',
  BARCODE: 'barcode',
};

const In07 = () => {

    //툴팁
  const bellRef = useRef(null);

  //인풋 + 체크박스
 const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);

//하단 사이드바
const [visibleBottom, setVisibleBottom] = useState(false);

const customHeader = (
    <div className="flex align-items-center gap-2">
        <span className="font-bold">입고창고 선택</span>
    </div>
);


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

//다이얼로그닫기
 const requestCloseDialog = () => {
    if (dialogClosing) return;

    setDialogClosing(true);

    setTimeout(() => {
      if (activeDialog === DIALOG.DETAIL) setVisible2(false);
      if (activeDialog === DIALOG.BARCODE) setVisible3(false);

      setActiveDialog(null);
      setDialogClosing(false);
    }, 300);
  };


// footer 
  const footerDetail = (
    <div className="flex w-full justify-between gap-2">
      <Button label="취소" outlined className="w-1/2 h-12 w-full" onClick={requestCloseDialog} />
      <Button label="적용" className="w-1/2 h-12  w-full btn-28-master" />
    </div>
  );

  const footerBarcode = (
    <div className="flex w-full  gap-2">
      <Button label="초기화" outlined className="w-1/2 h-12 w-full" onClick={requestCloseDialog} />
      <Button label="입고확정" className="w-1/2 h-12  w-full btn-28-master" />
    </div>
  );

   // 상세 다이얼로그 열기 
  const openDetailDialog = () => {
    setActiveDialog(DIALOG.DETAIL);
    setVisible2(true);
  };

  //지시검색 다이얼로그 열기
  const openBarcodeDialog = () => {
    setActiveDialog(DIALOG.BARCODE);
    setVisible3(true);
  };



   //다이얼로그 헤더
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


  const [toDate, setToDate] = useState(null);

 const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expandedId, setExpandedId] = useState(MOCK_DATA[0].id);
  const loaderRef = useRef(null);

//Infinite Scroll
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
  



   

// 입력 포커스 -창 오픈될때 입력 항목 포커스 두기!
const qtyInputRef = useRef(null);

useEffect(() => {
  if (visible2) {
    setTimeout(() => {
      qtyInputRef.current?.focus();
    }, 0);
  }
}, [visible2]);


//필터 숨겻다 펼치기 
const [isFilterOpen, setIsFilterOpen] = useState(false);
const hasFilterItems = true;
const HAS_INCOMING_FILTER = true;


const toggleCard = (id) => {
  setExpandedId((prev) => (prev === id ? null : id));
};


// 품목별 상세별 토글
const options = ['품목별', '상세별'];
const [value2, setValue2] = useState(options[0]); // 기본: 품목별

const IncomingListByProduct = ({
  data,
  expandedId,
  setExpandedId,
  openDetailDialog,
}) => (
  <div className="incoming-list">
    {data.map((item) => {
      const isOpen = expandedId === item.id;

      return (
        <div key={item.id}  className={classNames("incoming-card", { "is-open": isOpen,})} onClick={() => toggleCard(item.id)}>
          {/* ===== Header ===== */}
          <div className="incoming-card__header" >
            <div className="flex gap-2 items-center justify-content-center">
              {/*
                <span className="incoming-card__date">{item.id}</span>                
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                <span className="date">{item.id}</span>  
                  ===== Title ===== */}
                <div className="incoming-card__title">{item.product} 
                  <Button  
                    icon="pi pi-desktop"
                    text
                    security='secondary'
                    className='text-bb'
                    onClick={openDetailDialog} />
                </div>
            </div>                              
            <Button
              icon="pi pi-chevron-down"
              text
              rounded
              className={classNames("toggle-btn text-bb", { open: isOpen })}
              onClick={() =>
                setExpandedId(isOpen ? null : item.id)
              }
            />
          </div>

          {/* ===== Summary ===== */}
          <div className="incoming-card__summary">
            <div>
              <label>색상</label>
              <span> {item.color}</span>
            </div>
            <div>
              <label>수량</label>
              <span> {item.qty}</span>
            </div>
            <div>
              <label>길이</label>
              <span> {item.length}</span>
            </div>
            
            <div>
              <label>제조일자</label>
              <span> {item.deliveryDate}</span>
              <span> {item.deliveryTime}</span>
            </div>
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
                <label>생산호기</label>
                <span>{item.machine}</span>
              </div>
              <div>
                <label>대리점명</label>
                <span>{item.agency}</span>
              </div>
              <div>
                <label>현장명</label>
                <span>{item.site}</span>
              </div>
            </div>

          </div>
        </div>
      );
    })}
  </div>
);

const IncomingListByDetail = ({
  data,
  expandedId,
  setExpandedId,
  openDetailDialog,
}) => (
  <div className="incoming-list detail-view">
    {data.map((item) => {
      const isOpen = expandedId === item.id;

      return (
        <div key={item.id} className={classNames("incoming-card", { "is-open": isOpen,})} onClick={() => toggleCard(item.id)}>

          {/* ===== Header ===== */}
          <div className="incoming-card__header" >
            <div className="flex gap-2 items-center justify-content-center">
                <span className="incoming-card__date">{item.id}</span>
                {/*
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                <span className="date">{item.id}</span>  
                  ===== Title ===== */}
                <div className="incoming-card__title">{item.barcode} 
                  <Button  
                    icon="pi pi-desktop"
                    text
                    security='secondary'
                    className='text-bb'
                    onClick={openDetailDialog} />
                </div>
            </div>                              
            <Button
              icon="pi pi-chevron-down"
              text
              rounded
              className={classNames("toggle-btn text-bb", { open: isOpen })}
              onClick={() =>
                setExpandedId(isOpen ? null : item.id)
              }
            />
          </div>

          {/* ===== Summary ===== */}
          <div className="incoming-card__summary">
            <div>
              <label>색상</label>
              <span> {item.color}</span>
            </div>
            <div>
              <label>수량</label>
              <span> {item.qty}</span>
            </div>
            <div>
              <label>길이</label>
              <span> {item.length}</span>
            </div>
            
            <div>
              <label>제조일자</label>
              <span> {item.deliveryDate}</span>
              <span> {item.deliveryTime}</span>
            </div>
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
                <label>생산호기</label>
                <span>{item.machine}</span>
              </div>
              <div>
                <label>대리점명</label>
                <span>{item.agency}</span>
              </div>
              <div>
                <label>현장명</label>
                <span>{item.site}</span>
              </div>
            </div>

          </div>

        </div>
      );
    })}
  </div>
);


  return (
    <div className="card">  


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

          <div className="hugreen_mobile_wrap">
            <TabView className="hugreen-tabview" activeIndex={0}>
                <TabPanel header="재고실사 계획조회">
                  
                  {/* 공통 검색영역 */}
                  <div className="hugreen_searchwrap overflow-hidden">
                    <div className="grid-searchwrap grid-searchwrap--4col">
                      <div className="row">
                        <div className='th'>계획일자</div>
                        <div className='td gap-2'>
                            <Calendar className="w-full" value={toDate} onChange={(e) => setToDate(e.value)} showIcon />
                                <Button label="검색" text  className='btn-28-intable'/>
                                {/* 오른쪽 : 펼치기 / 숨기기 버튼
                                <Button
                                  text
                                  icon={isFilterOpen ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                                  disabled={!hasFilterItems}
                                  onClick={() => setIsFilterOpen(prev => !prev)}
                                /> */}
                          </div>
                      </div>
                      {hasFilterItems && (
                        <div
                            className={classNames(
                              "row overflow-hidden transition-all duration-300",
                              isFilterOpen ? "max-h-[500px]" : "max-h-0"
                            )}
                          >
                            {/*검색 버튼필요시 사용
                          <div className="th">지시검색</div>
                          <div className="td gap-2">
                            <InputText value={value} className="w-full" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                            <Button label="지시검색" text  className="btn-28-sec w-38" onClick={openBarcodeDialog} />
                          </div>
                          
                          <div className="flex search-btn-wrap">
                            <Button label="검색" text  className="search-btn"/>
                          </div> */}
                        </div>
                        )}
                        <Dialog
                              header={dialogHeader}
                              visible={visible3}
                              modal
                              className='w-full'
                              blockScroll
                              resizable={false}
                              //footer={footerBarcode}
                              closable={true}
                              onHide={requestCloseDialog}   
                            >
                               {/* 공통 검색영역 */}
                                <div className="hugreen_searchwrap overflow-hidden  p-0" style={{ boxShadow: "0 4px 8px rgba(0,0,0,.08)"}}>
                                  <div className="grid-searchwrap grid-searchwrap--4col border border-[#ddd] rounded-lg p-2" >
                                    <div className="row">
                                      <div className='th'>지시일자</div>
                                      <div className='td'>
                                        <div className="flex flex-wrap items-center justify-between w-full" >
                                            <div className="flex-1">
                                              <Calendar className="w-full" value={toDate} onChange={(e) => setToDate(e.value)} showIcon />
                                            </div>
                                          </div>
                                      </div>
                                      <div className="flex search-btn-wrap">
                                        <Button label="조회" text  className="search-btn"/>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* 목록내용 */}
                                 <div className="wrap border-t-0 border-[#fff]">
                                  {/* 공통 : 상단버튼 + 스위치탭  */}
                                  <div className="hugreen_aggridbtn_hwrap mt-2 p-0 border-t-[8px] border-white">
                                    <div className="flex">
                                      <span className="NumText"> 조회결과</span>
                                      <p className="totalNumText" >총&nbsp;<span>0</span>건</p>
                                    </div>
                                    <div className="flex gap-2"> 
                                      <Button label="취소" className='btn-28-sec' text />
                                      <Button label="선택" className='btn-28-master' text />
                                    </div>
                                  </div>
                                  {/* 공통 : 카드형 그리드 + 상세화면  */}
                                  <div className="hugreen_aggrid_hwrap p-0" >
                                    <div className="incoming-list">
                                      {MOCK_DATA.slice(0, visibleCount).map((item) => {
                                        const isOpen = expandedId === item.id;

                                        return (
                                          <div key={item.id}  className={classNames("incoming-card", { "is-open": isOpen,})} onClick={() => toggleCard(item.id)}>
                                                            
                                            {/* ===== Summary ===== */}
                                            <div className="incoming-card__list">
                                              <div>
                                                <label>지시번호</label>
                                                <span> {item.go}</span>
                                              </div>

                                              <div>
                                                <Button
                                                  icon="pi pi-check"
                                                  text
                                                  className={classNames("toggle-btn", isOpen ? "text-black" : "text-bb")}
                                                />
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

                        </Dialog> 
                    </div>
                  </div>

                  <div className="wrap">
                    {/* 공통 : 상단버튼 + 스위치탭  */}
                    <div className="hugreen_aggridbtn_hwrap">
                      <div className="flex">
                         <span className="NumText"> 조회결과</span>
                         <p className="totalNumText" >총&nbsp;<span>0</span>건</p>
                      </div>
                      <div className="flex gap-2"> 
                        <Button icon="pi pi-refresh" className='text-bb' text style={{ width: "20px"}} />
                        <Button icon="pi pi-trash" className='text-bb' text style={{ width: "20px"}}  />
                        <Button label="작업" className='btn-28-master' text />
                      </div>
                    </div>
                    {/* 공통 : 카드형 그리드 + 상세화면  */}
                    <div className="hugreen_aggrid_hwrap">
                       {value2 === '품목별' ? (
                          <IncomingListByProduct
                            data={MOCK_DATA.slice(0, visibleCount)}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            openDetailDialog={openDetailDialog}
                          />
                        ) : (
                          <IncomingListByDetail
                            data={MOCK_DATA.slice(0, visibleCount)}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            openDetailDialog={openDetailDialog}
                          />
                        )}

                        {/* ===== Infinite Scroll Trigger ===== */}
                        <div ref={loaderRef} className="incoming-list__loader" />
                      </div>
                      <Dialog
                          header={dialogHeader}
                          visible={visible2}
                          modal
                          blockScroll
                          resizable={false}
                          footer={footerDetail}
                          closable={true}
                          onHide={requestCloseDialog}   
                        >
                          <div className="flex w-full">
                            <div className="grid-view">
                              <div className="row">
                                <div className="th">팔렛번호</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="P160225015"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">품명</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="PBF-1208"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">색상,길이</div>
                                  <div className="td  gap-2">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="JN9FF, 넓은"
                                  />
                                    <InputText
                                    className="w-28"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="6100"
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="th th--required">수량</div>
                                <div className="td">
                                  <InputText
                                    ref={qtyInputRef}
                                    autoFocus
                                    className="w-full"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="77"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">제조일자</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="2026.01.09"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">생산호기</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="W01"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">대리점</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="(주)아키원"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">현장</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="서울 중구 수표동 23번길, 시그니처타워빌딩 4층"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">하역지</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="(주) 아키원 18455 경기도 화성.."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                      </Dialog> 
                    </div>
                  
                 

                  {/* 공통 : 전페페이지건수  
                  <button className="scan-button" text>
                    <i><span >108</span> 건</i>
                  </button>*/}

                </TabPanel>
                <TabPanel header="재고실사">
                  {/* 공통 검색영역 */}
                  <div className="hugreen_searchwrap overflow-hidden">
                    <div className="grid-searchwrap grid-searchwrap--4col">
                      <div className="row">
                        <div className='th'>비고</div>
                        <div className='td'>
                          <Calendar className="w-full" value={toDate} onChange={(e) => setToDate(e.value)} showIcon />
                        </div>
                      </div>
                      {hasFilterItems && (
                        <div
                            className={classNames(
                              "row overflow-hidden transition-all duration-300",
                              isFilterOpen ? "max-h-[500px]" : "max-h-0"
                            )}
                          >
                         
                        </div>
                        )}
                    </div>
                  </div>
                  
                  <div className="wrap">
                    {/* 공통 : 상단버튼 + 스위치탭  */}
                    <div className="hugreen_aggridbtn_hwrap">
                      <div className="flex">
                         <span className="NumText"> 조회결과</span>
                         <p className="totalNumText" >총&nbsp;<span>0</span>건</p>
                      </div>
                      <div className="flex gap-2"> 
                        <Button icon="pi pi-refresh" className='text-bb' text style={{ width: "20px"}} />
                        <Button icon="pi pi-trash" className='text-bb' text style={{ width: "20px"}}  />
                        <Button label="저장" className='btn-28-master' text />
                      </div>
                    </div>
                    {/* 공통 : 카드형 그리드 + 상세화면  */}
                    <div className="hugreen_aggrid_hwrap">
                       {value2 === '품목별' ? (
                          <IncomingListByProduct
                            data={MOCK_DATA.slice(0, visibleCount)}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            openDetailDialog={openDetailDialog}
                          />
                        ) : (
                          <IncomingListByDetail
                            data={MOCK_DATA.slice(0, visibleCount)}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            openDetailDialog={openDetailDialog}
                          />
                        )}

                        {/* ===== Infinite Scroll Trigger ===== */}
                        <div ref={loaderRef} className="incoming-list__loader" />
                      </div>
                      <Dialog
                          header={dialogHeader}
                          visible={visible2}
                          modal
                          blockScroll
                          resizable={false}
                          footer={footerDetail}
                          closable={true}
                          onHide={requestCloseDialog}   
                        >
                          <div className="flex w-full">
                            <div className="grid-view">
                              <div className="row">
                                <div className="th">팔렛번호</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="P160225015"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">기존품목</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="PBF-1208"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th th--required">변경품목</div>
                                <div className="td gap-2">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="PBF-1208"
                                  />
                                  <InputText
                                    className="w-38"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="선택"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th th--required">길이</div>
                                  <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="JN9FF, 넓은"
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="th th--required">수량</div>
                                <div className="td gap-2">
                                  <InputText
                                    ref={qtyInputRef}
                                    autoFocus
                                    className="w-full"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="77"
                                  />
                                   <Button label="선택" className='btn-28-sec w-28' text onClick={() => setVisibleBottom(true)} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="th">제조일자</div>
                                <div className="td">
                                  <InputText
                                    className="w-full"
                                    value={value}
                                    disabled
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="2026.01.09"
                                  />
                                </div>
                              </div>
                              
                            </div>
                          </div>

                          <Sidebar  header={customHeader} visible={visibleBottom}  blockScroll position="bottom" style={{ height: '40vh' }} onHide={() => setVisibleBottom(false)} >
                            <div className="flex flex-col gap-2">
                                <div className="w-full">반제품창고</div>
                                <div className="w-full">포스코 구리인창 PL</div>
                                <div className="w-full">포스코 송도그린워크3차 아파트</div>
                                <div className="w-full">SK시흥</div>
                                <div className="w-full">극동 고양</div>
                                <div className="w-full">포스코 내곡</div>
                                <div className="w-full">반제품창고</div>
                                <div className="w-full">포스코 구리인창 PL</div>
                                <div className="w-full">포스코 송도그린워크3차 아파트</div>
                                <div className="w-full">SK시흥</div>
                                <div className="w-full">극동 고양</div>
                                <div className="w-full">포스코 내곡</div>
                                <div className="w-full">반제품창고</div>
                                <div className="w-full">포스코 구리인창 PL</div>
                                <div className="w-full">포스코 송도그린워크3차 아파트</div>
                                <div className="w-full">SK시흥</div>
                                <div className="w-full">극동 고양</div>
                                <div className="w-full">포스코 내곡</div>
                                <div className="w-full">반제품창고</div>
                                <div className="w-full">포스코 구리인창 PL</div>
                                <div className="w-full">포스코 송도그린워크3차 아파트</div>
                                <div className="w-full">SK시흥</div>
                                <div className="w-full">극동 고양</div>
                                <div className="w-full">포스코 내곡</div>
                                <div className="w-full">반제품창고</div>
                                <div className="w-full">포스코 구리인창 PL</div>
                                <div className="w-full">포스코 송도그린워크3차 아파트</div>
                                <div className="w-full">SK시흥</div>
                                <div className="w-full">극동 고양</div>
                                <div className="w-full">포스코 내곡</div>
                            </div>
                        </Sidebar>

                      </Dialog> 
                    </div>

                </TabPanel>
            </TabView>
          </div>

          


        </div>      
    </div>
  );
};

export default In07;
