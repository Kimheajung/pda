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

const In08 = () => {

    //툴팁
  const bellRef = useRef(null);

  //인풋 + 체크박스
 const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);



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

    //지시검색 다이얼로그 열기
  const openListDialog = () => {
    setActiveDialog(DIALOG.LIST);
    setVisible4(true);
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

          <div className="hugreen_mobile_wrap" style={{ background: "white"}}>
                {/* 공통 검색영역 */}
                <div className="hugreen_searchwrap overflow-hidden">
                <div className="grid-searchwrap grid-searchwrap--4col">
                    <div className="row">
                    <div className='th'>팔렛번호</div>
                    <div className='td gap-2'>
                        <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="PSF-116G"
                            />                       
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="wrap w-full">
                {/* 공통 : 그리드 상단 버튼  */}
                <div className="hugreen_aggridbtn_hwrap">
                    {/* 공통 : 그리드 상단 버튼  */}
                    <div className="flex items-center justify-between w-full">
                    <div className="flex">
                        <span className="NumText"> 바코드가 스캔되었습니다.</span>
                    </div>
                    <div className="flex gap-2"> 
                        <Button label="취소" className='btn-28-sec' text />
                        <Button label="초기화" className='btn-28-master' text />
                    </div>
                    </div>

                    <div className="flex mt-2 scan-wrap">
                    <div className="grid-view" >
                       
                        <div className="row">
                        <div className="th">품명</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="PSF-116G"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">규격</div>
                            <div className="td gap-2">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="완제품(W)"
                            />
                            <InputText
                            className="w-28"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="6100160100"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">재고</div>
                            <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="165"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">제조일자</div>
                            <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="2025.09.11"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">생산호기</div>
                            <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="W02"
                            />
                        </div>
                        </div>

                        <div className="row">
                        <div className="th">대리점</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="위넥스"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">현장</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="라인양산12"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">하역지</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="에이스윈도우"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">입고일자</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="2019.01.01"
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="th">현재위치</div>
                        <div className="td">
                            <InputText
                            className="w-full"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="안양"
                            />
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

export default In08;
