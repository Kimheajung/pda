import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import classNames from 'classnames';
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
const [visible3, setVisible3] = useState(false);
const [dialogClosing, setDialogClosing] = useState(false);
  const footerContent2 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible2(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible2(false)} autoFocus />
    </div>
  );
const requestCloseDialog = () => {
  if (dialogClosing) return;

  setDialogClosing(true);

  setTimeout(() => {
    setVisible2(false);
    setDialogClosing(false);
  }, 300); // CSS 애니메이션 시간과 동일
};


  
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
  
  //다이얼로그
  const dialogTitle = '상세화면';
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



  return (
    <div className="card">  


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

          <div className="hugreen_mobile_wrap">
            <TabView className="hugreen-tabview" activeIndex={0}>
                <TabPanel header="입고내역조회">
                    {/* 공통 검색영역(PC+모바일대응) */}
                    <div className="hugreen_m_search flex-1 flex flex-wrap">
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
                </TabPanel>
                <TabPanel header="자가생산입고(개별)">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
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
           

            
            


            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap mt-4">
              <div className="flex">
                <span className="NumText"> 조회결과</span>
                <p className="totalNumText" >총&nbsp;<span>18,203</span>건</p>
              </div>
               <div className="flex gap-2"> 
                <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                <Button label="3.모달 - 상세화면" className="btn-28-master" onClick={() => setVisible2(true)} />
                <Dialog
                  header={dialogHeader}
                  visible={visible2}
                  modal
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
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">

                      그리드 들어올곳

            </div>


        </div>      
    </div>
  );
};

export default Layout01;
