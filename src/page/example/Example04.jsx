import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
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

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';

const Example04 = () => {

    // 8. autocomplete
  const [autoValue, setAutoValue] = useState('');
  const [items, setItems] = useState([]);

  const search = (event) => {
    let _items = [...Array(10).keys()];
    setItems(
      event.query
        ? [...Array(10).keys()].map((item) => event.query + '-' + item)
        : _items
    );
  };

  const [checked, setChecked] = useState(false);
  /* 달력 */
  const [date, setDate] = useState(null);

  /* 즐겨찾기 아이콘  */
  const [filled, setFilled] = useState(false);

  /* 업무영역 도움말 패널영역 정의 */
  const [visibleRight, setVisibleRight] = useState(false);

  /* primereact - BreadCrumb */
  

  /*input, combobox */
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

  /* 페크박스  */
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

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

  /* 다이얼로그 팝업 */
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const footerContent = (
    <div className="gap-2">
      <Button
        label="취소"
        onClick={() => setVisible(false)}
        outlined
        className="mr-2"
      />
      <Button label="적용" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

  const footerContent4 = (
    <div className="gap-2">
      <Button
        label="취소"
        onClick={() => setVisible4(false)}
        outlined
        className="mr-2"
      />
      <Button label="적용" onClick={() => setVisible4(false)} autoFocus />
    </div>
  );

  return (
    <div className="card_etc">  

        <h2 className='mb-4'>3. 검색영역 </h2>

       
        <div className="guidetitle mt-10">1.검색영역 항목 예제 </div>
        {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

            <p> - 공지사항처럼 라벨text 없이  진행할 경우 </p>
            {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">
              {/* 공통 : 테스트용  */}
              <div className="flex w-full">
                <div className="grid-searchwrap grid-searchwrap--4col" >
                
                  <div className="row">
                    <div className="th flex-wrap merge-5 gap-2">
                      <Dropdown value={selectedCity}  className="w-28" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                          placeholder="제목"/>
                      <Dropdown value={selectedCity}  className="w-48" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                          placeholder="제목"/>
                      <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요"  className="w-full"/>
                      </IconField>    
                    </div>
                  </div>
                  </div>  
                </div>
              </div>
              
              <div className="flex search-btn-wrap">  
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


            {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap mt-10" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap">
                         <div className="row" >
                           <div className="th"> <label for="firstname5">오더일자0</label></div>
                            <div className="td merge-3 gap-2 ">
                              <InputText value={value} className="w-38" onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>                 
                              <InputText value={value} className="w-28"  onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>                 
                              <InputText value={value} className="w-80"  onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>                 
                              <Button label="검색" className='in' severity="secondary" outlined /> 
                           </div>
                         </div>
                       </div>
                     </div>
              </div>
              
              <div className="flex search-btn-wrap">  
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>



            {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap mt-10" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap">
                         <div className="row" >
                           <div className="th"> <label for="firstname5">오더일자1</label></div>
                            <div className="td">
                              <InputText value={value} className='w-full'  onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>                 
                           </div>
                           <div className="th merge-2">
                             <div className="flex flex-wrap items-center gap-2">    
                                <label >부가세포함</label>
                                <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />    
                              </div>   
                           </div>
                         </div>
                       </div>
                     </div>
              </div>
              
              <div className="flex search-btn-wrap">  
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>



             {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap">
                         <div className="row" >
                           <div className="th"> <label for="firstname5">검색기간</label></div>
                            <div className="td">
                              <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                              <span className='p-1'> - </span>
                              <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon />               
                           </div>
                           <div className="th flex  merge-2 gap-2">
                             <div className="flex align-items-center">
                              <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                              <label htmlFor="ingredient1">부가세포함</label>
                              </div>
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                                <label htmlFor="ingredient2">부가세상세</label>
                              </div> 
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                                <label htmlFor="ingredient2">부가세미포함</label>
                              </div> 
                           </div>
                         </div>
                       </div>
                     </div>
              </div>
              
              <div className="flex search-btn-wrap">  
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>



          
           {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--4col">                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">오더일자2</label></div>
                           <div className="td">
                             <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                             <span className='p-1'> - </span>
                             <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon />   
                           </div>
                           <div className="th">금형2</div>
                           <div className="td gap-2">
                              <IconField iconPosition="right" className='w-full'>
                                   <InputIcon className="pi pi-search"> </InputIcon>
                                   <InputText placeholder="입력해주세요" className='w-full' />
                               </IconField>    
                               <Button label="검색" className='in' severity="secondary" outlined />                         
                           </div>
                         </div>
                         
                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>
            
          
           {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--6col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">오더일자3</label></div>
                           <div className="td">
                              <FormAutoComplete
                                value={autoValue}
                                onChange={setAutoValue}
                                suggestions={items}
                                completeMethod={search}
                                placeholder="자동완성"
                              /> 
                           </div>
                           <div className="th">금형</div>
                           <div className="td">
                              <IconField iconPosition="right" className='w-full'>
                                   <InputIcon className="pi pi-search"> </InputIcon>
                                   <InputText placeholder="입력해주세요" className='w-full' />
                               </IconField>                            
                           </div>
                           <div className="th">시스템명1</div>
                           <div className="td">
                             <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                         </div>

                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


              {/* 공통 : 검색영역1  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--8col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">오더일자4</label></div>
                           <div className="td">
                             <InputText className="w-full" value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  
                           </div>
                           <div className="th">금형</div>
                           <div className="td">
                              <IconField iconPosition="right" className='w-full'>
                                   <InputIcon className="pi pi-search"> </InputIcon>
                                   <InputText placeholder="입력해주세요" className='w-full' />
                               </IconField>                            
                           </div>
                           <div className="th">시스템명1</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                           <div className="th">선택</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className='w-full' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                         </div>

                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


            {/* 공통 : 검색영역2  */}
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--8col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">오더일자5</label></div>
                           <div className="td gap-2">
                              <InputText className="w-full" value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>
                           </div>
                           <div className="th">금형</div>
                           <div className="td">
                              <IconField iconPosition="right" className='w-full'>
                                   <InputIcon className="pi pi-search"> </InputIcon>
                                   <InputText placeholder="입력해주세요" className='w-full' />
                               </IconField>                            
                           </div>
                           <div className="th">시스템명1</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                            <div className="th">시스템명2</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                         </div>
                 
                         <div className="row">
                           <div className="th">오더번호6</div>
                           <div className="td gap-2">
                             <InputText value={value} className="w-full" onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>
                             <Button label="검색" className='in' outlined />
                           </div>
                           <div className="th">공정구분</div>
                           <div className="td">
                             <Dropdown value={selectedCity}  className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                           <div className="th">절단길이1</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                           <div className="th">절단길이2</div>
                           <div className="td">
                             <Dropdown value={selectedCity} className="w-full" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                         </div>
                         
                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


            
              {/* 공통 : 검색영역1  */}
              <p> -  응용1 : 주문관리 - 주문조회 </p>
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--8col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">주문조회</label></div>
                           <div className="td merge-3 gap-2 flex md:flex-nowrap">
                              <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                              <Calendar value={date} className='w-28' onChange={(e) => setDate(e.value)} showIcon /> 
                              <span className='p-1'> - </span>
                              <Calendar value={date} className='w-28' onChange={(e) => setDate(e.value)} showIcon /> 
                           </div>
                           <div className="th">주문번호</div>
                           <div className="td  merge-3">
                              <IconField iconPosition="right">
                                   <InputIcon className="pi pi-search"> </InputIcon>
                                   <InputText placeholder="입력해주세요" />
                               </IconField>                            
                           </div>
                         </div>

                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


             {/* 공통 : 검색영역1  */}
              <p> -  응용2 : 건설현장관리 - 건설현장등록 </p>
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--6col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">조회조건</label></div>
                           <div className="td gap-2">
                              <div className="flex align-items-center">
                              <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                              <label htmlFor="ingredient1">담당자</label>
                              </div>
                              <div className="flex align-items-center">
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                                <label htmlFor="ingredient2">전체</label>
                              </div>
                           </div>
                           <div className="th">건설사</div>
                           <div className="td gap-2 merge-3 w-full flex md:flex-nowrap">
                              <InputText value={value} className="w-28" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              <Button label="검색" className='in' outlined />
                                <Dropdown value={selectedCity} className='w-60' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                  placeholder="선택해주세요"/>                       
                           </div>
                         </div>

                         <div className="row">
                           <div className="th"> <label for="firstname5">팀</label></div>
                           <div className="td">
                            <Dropdown value={selectedCity} className='w-full'  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                           </div>
                           <div className="th">종결</div>
                           <div className="td ">
                             <Dropdown value={selectedCity}  onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>                           
                           </div>
                           <div className="th">사용자</div>
                           <div className="td ">
                              김건설                         
                           </div>
                         </div>


                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>


            {/* 공통 : 검색영역1  */}
            <p> - 응용3 : 현황관리 - 특판현장별 수불부 </p>
            <div className="hugreen_searchwrap" >
              <div className="flex w-[95%]">

                 <div className="flex w-full">
                       <div className="grid-searchwrap grid-searchwrap--8col">
                       
                         <div className="row">
                           <div className="th"> <label for="firstname5">조회년월</label></div>
                           <div className="td">
                             <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />  
                           </div>
                           <div className="th">건설현장명</div>
                           <div className="td gap-2  merge-3 w-full flex md:flex-nowrap">
                             <InputText value={value} className="w-28" onChange={(e) => setValue(e.target.value)}  placeholder=""/>
                              <Button label="검색" className='in' outlined />
                                <Dropdown value={selectedCity} className='w-60' onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                  placeholder="선택해주세요"/>                             
                           </div>
                           <div className="th"> <label for="firstname5">팀명</label></div>
                           <div className="td gap-2 flex ">
                              <Dropdown value={selectedCity}  className="w-28" onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                placeholder="선택해주세요"/>
                              <div className="flex flex-wrap align-items-center">
                                <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                                <label htmlFor="ingredient1">부가세포함</label>
                              </div>                                   
                           </div>
                         </div>

                       </div>
                     </div>

              </div>
              <div className="flex search-btn-wrap">
                <Button label="검색" text  className="search-btn"/>
              </div>
            </div>






        </div> 
    </div>
    
    

  );
};

export default Example04;

