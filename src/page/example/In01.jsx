import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
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



const In01 = () => {

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
  const footerContent2 = (
    <div className="dialog-footer-split gap-4">
        <Button label="취소" className="dialog-footer-btn" onClick={() => setVisible2(false)} outlined/>
        <Button label="적용" className="dialog-footer-btn" onClick={() => setVisible2(false)} autoFocus  />
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

//다이얼로그
  const dialogTitle = '자가생산입고';
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
  
  

  return (
    <div className="card">        


        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

             {/* 공통 검색영역(PC+모바일대응) */}
            <div className="hugreen_tabarea flex-1 flex flex-wrap">
                <img src="/pda/images/mobile-01.png" alt="main" className="max-w-none"  />
            </div>
            


            {/* 공통 : 그리드 상단 버튼  */}
            <div className="hugreen_aggridbtn_hwrap mt-4 mb-4">
              <div className="flex">
                <span className="NumText"> 조회결과</span>
                <p className="totalNumText" >총&nbsp;<span>18,203</span>건</p>
              </div>
               <div className="flex gap-2"> 
                <Button label="저장" className="btn-28-intable" severity="secondary" outlined /> 
                <Button label="삭제" className="btn-28-sec" severity="secondary" outlined /> 
                <Button label="검색" className="btn-28-master" severity="secondary" outlined />
              </div>
            </div>
            {/* 공통 : ag그리드  */}
            <div className="hugreen_aggrid_hwrap">
                   <img src="/pda/images/mobile-02.png" alt="main" className="max-w-none"  />

            </div>

            
             {/* 공통 : 스캔버튼  */}
              <button className="scan-button" onClick={() => setVisible2(true)}>
                <i className="pi pi-barcode text-xl"></i>
              </button>

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

        </div>      
    </div>
  );
};

export default In01;
