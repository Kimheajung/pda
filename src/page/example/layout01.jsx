import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Editor } from 'primereact/editor';
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



const Layout01 = () => {

  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);

    //툴팁
  const bellRef = useRef(null);

  //인풋
 const [text, setText] = useState('');

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



  /* 다이얼로그 팝업 */
 const [visible2, setVisible2] = useState(false);
const [dialogClosing, setDialogClosing] = useState(false);
  const footerContent2 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible2(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible2(false)} autoFocus />
    </div>
  );
const closeDialogWithSlide = () => {
  setDialogClosing(true);

  setTimeout(() => {
    setVisible2(false);
    setDialogClosing(false);
  }, 300); 
};


  
  // 검색영역 폼 
  const SearchForm = ({ value, setValue, selectedCity, setSelectedCity, cities }) => (
    
    <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--8col">
      
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
  
  //다이얼로그
  const dialogTitle = '상세화면';
  const dialogHeader = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="p-link text-gray-600"
        onClick={closeDialogWithSlide}
      >
        <i className="pi pi-arrow-left text-mg" />
      </button>

      <span className="font-semibold text-lg truncate" >
        {dialogTitle}
      </span>
    </div>
  );



  return (
    <div className="card">  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-4">
              <h2>1.검색영역 + 그리드를 가진 기본 레이아웃 </h2>
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
        </div>

      


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

             {/* 공통 검색영역(PC+모바일대응) */}
            <div className="hugreen_grid flex-1 flex flex-wrap">
              {/* PC (md 이상) */}
              <div className="hugreen_searchwrap hidden md:flex transition-all duration-300">
                <div className="flex">
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
                <span className="NumText"> 조회결과</span>
                <p class="totalNumText" >총&nbsp;<span>18,203</span>건</p>
              </div>
               <div className="flex gap-2"> 
                <Button label="저장" className="btn-28-intable" severity="secondary" outlined /> 
                <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                <Button label="검색" className="btn-28-master" severity="secondary" outlined />
                <Button label="3.모달 - 상세화면" onClick={() => setVisible2(true)} />
                <Dialog header={dialogHeader} 
                visible={visible2} modal resizable={false} 
                 footer={footerContent2}
                  closable={false}
                className={classNames(
                'user-dialog slide-dialog',
                { 'slide-out-Right': dialogClosing }
                )}
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
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">

                      그리드 들어올곳

            </div>


        </div>      
    </div>
  );
};

export default Layout01;
