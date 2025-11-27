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
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Checkbox } from "primereact/checkbox";
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

const Layout09write = () => {

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

         /* 다이얼로그 팝업  - 공지사항 */
  const [visible2, setVisible2] = useState(false);
  const footerContent2 = (
          <div className="gap-2">
              <Button label="취소"  onClick={() => setVisible2(false)} outlined className='mr-2'/>
              <Button label="목록바로가기"  onClick={() => setVisible2(false)} autoFocus />
          </div>
      );

  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);
  const regions = [
    { label: "서울", value: "seoul" },
    { label: "부산", value: "busan" },
    { label: "대전", value: "daejeon" },
  ];


  /* 페크박스  */
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
      let _ingredients = [...ingredients];

      if (e.checked)
          _ingredients.push(e.value);
      else
          _ingredients.splice(_ingredients.indexOf(e.value), 1);

      setIngredients(_ingredients);
  }

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
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap">
               <div className="flex">
                  <span className="InfoText"> 금호석유화학의 소식과 공지사항을 여러분께 알려드리는 공간입니다.</span>
               </div>
               <div className="flex gap-2"> 
                <Link to="/layout09"><Button label="목록" className="btn-28-sec" severity="secondary" outlined /> </Link>
                <Button label="저장" className="btn-28-master" severity="secondary" outlined />
              </div>
            </div>
            {/* 공통 : ag그리드  */}
            <div className="flex w-full" >
             <div className="dtv-info-grid dtv-info-grid--4col">
                <div className="row">
                  <div className="th">제목</div>
                  <div className="td merge-3"><InputText value={value} className="w-full" onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                <div className="row">
                  <div className="th">팝업창사용</div>
                  <div className="td">
                     <Dropdown value={selectedCity}  className="w-28" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                      placeholder="제목"/>

                      <Button label="공지성 모달팝업 예시" className="btn-32-intable" severity="secondary" outlined onClick={() => setVisible2(true)}/> 
                      <Dialog header="2025년 예산건자재공장 12월 휴무 일정 공지 건" visible={visible2} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => {if (!visible2) return; setVisible2(false); }} footer={footerContent2}>
                          {/* 공통 : ag그리드  */}
                          <div className="flex flex-wrap">
                            안녕하십니까. <br/>
                            예산건자재공장 12월 휴무 일정을 공지드리오니, 업무에 참고하시기 바랍니다. <br/><br/>

                            ▶ 공장 가동일 : 2025. 12. 19(금) 까지<br/>
                            ▶ 원/부자재 출고일 : 2025. 12. 24(수) 까지<br/><br/>

                            - 휴무일정 - <br/>
                            ● 2025. 12. 25(목) : 성탄절 <br/>
                            ● 2025. 12. 26(금) : 샌드위치 휴무 <br/>
                            ● 2025. 12. 27(토) ~ 2025. 12. 28(일) : 주말 휴무 <br/>
                            ● 2025. 12. 29(월) ~ 2025. 12. 31(수) : 샌드위치 휴무 <br/>
                            ● 2026. 01. 01(목) : 신정<br/>
                            ● 2026. 01. 02(금) : 샌드위치 휴무<br/><br/>

                            * 공장 가동은 12/19(금)까지, 원/부자재 출고는 12/24(수) 까지만 가능하오니, 상기 일정 참고하시어 원/부자재 납기 일정 사전에 조
                            정하시기 바랍니다. <br/>
                            (부자재12월달 마감 관련 자료는 12/24(수)까지 송부 부탁드립니다.)

                            감사합니다.      
                          </div>
                          <div className="flex flex-wrap justify-between mt-4 mb-2">
                            <div className="flex">
                              첨부파일.pdf
                            </div>
                            <div className="flex">
                              <div className="flex align-items-center">
                                  <Checkbox inputId="ingredients" name="pizza" value="Cheese" />
                                  <label htmlFor="ingredients" className="ml-2">오늘은 다시 창을 띄우지 않기</label>
                              </div>
                            </div>
                          </div>
                      </Dialog> 
                  </div>
                   <div className="th">팝업창 설정기한</div>
                  <div className="td">
                     <Dropdown value={selectedCity}  className="w-28" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                      placeholder="제목"/>
                  </div>
                </div>

                <div className="row">
                  <div className="th">작성자</div>
                  <div className="td">
                     관리자
                  </div>
                   <div className="th">작성일</div>
                  <div className="td">
                    2025.11.27 09:10:27
                  </div>
                </div>                

                <div className="row">
                   <div className="th">내용작성</div>
                  <div className="td block merge-3 h-[30rem]">
                    <Editor value={text} className="flex flex-wrap w-full h-full"  onTextChange={(e) => setText(e.htmlValue)}  />
                  </div>
                </div>

                 <div className="row">
                  <div className="th">첨부파일</div>
                  <div className="td">
                    <div className='flex gap-2'>
                      <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>
                      <Button label="찾아보기" className="btn-32-intable" severity="secondary" outlined onClick={() => setVisible(true)}/> 
                      <Dialog header="공통-파일첨부" visible={visible} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                          {/* 공통 : ag그리드  */}
                          <div className="flex flex-wrap">
                            <FileUpload name="demo[]" className="w-full" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0"> 여기에 파일을 드롭하거나 상단 아이콘으로 선택하세요 </p>} />
      
                          </div>
                      </Dialog>                        
                    </div>
                  </div>
                </div>

                
              </div>
            </div>

           
        </div>
    </div> 
  );
};

export default Layout09write;
