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
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar';
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

import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';



const Layout09view = () => {

     /* 달력 */
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null); // 월
  const [year, setYear] = useState(null); // 년

 const [text, setText] = useState('');

   /* 다이얼로그 팝업 */
  const [visible, setVisible] = useState(false);
  const footerContent = (
          <div className="gap-2">
              <Button label="취소"  onClick={() => setVisible(false)} outlined className='mr-2'/>
              <Button label="적용"  onClick={() => setVisible(false)} autoFocus />
          </div>
      );

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
        <div className="hugreen_grid tems-start flex flex-wrap  md:flex-row">

            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap">
               <div className="flex">
                  <span className="InfoText"> 금호석유화학의 소식과 공지사항을 여러분께 알려드리는 공간입니다.</span>
               </div>
               <div className="flex  gap-2"> 
                <Link to="/layout09"><Button label="목록" className="btn-28-sec" severity="secondary" outlined /> </Link>
                <Button label="수정" className="btn-28-sec" severity="secondary" outlined />
                 <Button label="삭제" className="btn-28-sec" severity="secondary" outlined />
                <Button label="저장" className="btn-28-master" severity="secondary" outlined />
              </div>
            </div>
            {/* 공통 : ag그리드  */}
           <div className="flex  w-full">
             <div className="dtv-info-grid dtv-info-grid--4col-view">
              
                <div className="row">
                  <div className="th">제목</div>
                  <div className="td merge-3">
                    <div className="span">2025년 예산건자재공장 12월 휴무 일정 공지 건.</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th">업체구분</div>
                  <div className="td">
                    <div className="span">전체</div>
                  </div>
                  <div className="th">작성자</div>
                  <div className="td">
                    <div className="span">업무지원팀</div>
                  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                    <div className="span">900</div>
                  </div>
                  <div className="th">작성일</div>
                  <div className="td">
                    <div className="span">2025.11.24 11:29:52</div>
                  </div>
                </div>


                <div className="row">
                  <div className="th">내용</div>
                  <div className="td merge-3">
                    <div className="fulltext">
                        
                        내용	안녕하십니까.
                        예산건자재공장 12월 휴무 일정을 공지드리오니, 업무에 참고하시기 바랍니다.

                        ▶ 공장 가동일 : 2025. 12. 19(금) 까지
                        ▶ 원/부자재 출고일 : 2025. 12. 24(수) 까지

                        - 휴무일정 -
                        ● 2025. 12. 25(목) : 성탄절
                        ● 2025. 12. 26(금) : 샌드위치 휴무
                        ● 2025. 12. 27(토) ~ 2025. 12. 28(일) : 주말 휴무
                        ● 2025. 12. 29(월) ~ 2025. 12. 31(수) : 샌드위치 휴무
                        ● 2026. 01. 01(목) : 신정
                        ● 2026. 01. 02(금) : 샌드위치 휴무

                        * 공장 가동은 12/19(금)까지, 원/부자재 출고는 12/24(수) 까지만 가능하오니, 상기 일정 참고하시어 원/부자재 납기 일정 사전에 조
                        정하시기 바랍니다.
                        (부자재12월달 마감 관련 자료는 12/24(수)까지 송부 부탁드립니다.)

                        감사합니다
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="th">첨부파일</div>
                  <div className="td merge-3">
                    <div className="span">첨부파일 없음.</div>
                  </div>
                </div>
                
              </div>
            </div>

           
        </div>
    </div> 
  );
};

export default Layout09view;
