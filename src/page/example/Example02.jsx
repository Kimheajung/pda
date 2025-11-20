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
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import CodeBox from "@/components/form/CodeBox";


import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';


const Example02 = () => {
  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);

  /* 달력 */
  const [date, setDate] = useState(null);

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
  const [ingredient, setIngredient] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
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
 const [visible5, setVisible5] = useState(false);
 const footerContent = (
        <div className="gap-2">
            <Button label="취소"  onClick={() => setVisible(false)} outlined className='mr-2'/>
            <Button label="적용"  onClick={() => setVisible(false)} autoFocus />
        </div>
    );

  const footerContent4 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible4(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible4(false)} autoFocus />
    </div>
  );
  const footerContent5 = (
    <div className="gap-2">
        <Button label="취소"  onClick={() => setVisible5(false)} outlined className='mr-2'/>
        <Button label="적용"  onClick={() => setVisible5(false)} autoFocus />
    </div>
  );


  
  // 검색영역 폼 
  const SearchForm = ({ value, setValue, selectedCity, setSelectedCity, cities }) => (
    <div className="flex w-full">
      <div className="grid-searchwrap grid-searchwrap--2col">
      
        <div className="row">
          <div className="th"> <label for="firstname5">오더일자</label></div>
          <div className="td">
            <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  
          </div>
        </div>
        
      </div>
    </div>
  );


  /* 컨펌 다이얼로그 */
   const toast = useRef(null);

  // 예시
    let dialogRef;

    const accept = () => {
        if (dialogRef) dialogRef.hide(); // 창 강제 닫기
    };

    const reject = () => {
        if (dialogRef) dialogRef.hide(); // 창 강제 닫기
    };

    const confirm1 = () => {
        confirmDialog({
            className: " no-header",
            header: null,              // 헤더 제거
            closable: false,           // X 버튼 제거
            message: (
              <div className="leading-relaxed text-center">
                찾으시는 데이터가 없습니다.<br/>
                그래도 그리드에 저장하시겠습니까?
              </div>
            ),
            defaultFocus: 'accept',
            accept,            
            reject,
            rejectClassName: "p-button-outlined custom-reject mr-2"
        });
    };

    const confirm2 = () => {
        confirmDialog({
            className: " no-header",
            header: null,              // 헤더 제거
            closable: false,           // X 버튼 제거
            message: (
              <div className="leading-relaxed text-center">
                삭제하시겠습니까 설정이 저장됩니다.
              </div>
            ),
            defaultFocus: 'reject',
            acceptClassName: 'accept',
            accept,
            reject,
            rejectClassName: "p-button-outlined custom-reject mr-2"
        });
    };




  return (
    <div className="card_etc">  

        <h2 className='mb-4'>2. 컴포넌트 정의 </h2>

        <div className="guidetitle">1.타이틀영역 정의(해당업무영역 타이틀 + 즐겨찾기 + BreadCrumb + 해당업무 매뉴얼 ) </div>
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>기성계약 </h2>
              {/* 공통 : 메뉴별 즐겿자기 */}
              <Button
                icon={filled ? "pi pi-star-fill" : "pi pi-star"}
                className="layout-Favorite-button"
                onClick={() => setFilled((prev) => !prev)}
                aria-label="Favorite"
                text 
              />
            </div>          
            <div className="flex items-center">
               <BreadCrumb model={items} home={home} />               
               {/* 공통 : 메뉴별 도움말 */}
               <button className="layout-BreadCrumb-button" onClick={() => setVisibleRight(true)}>
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
        <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">

         

            {/* 공통 : 그리드 상단 버튼  */}
            <div className="guidetitle mt-10">2.그리드 상단 총건수 + 버튼 </div>
            <div className="hugreen_aggridbtn_hwrap">
              <div className="flex">
                <span className="NumText"> 조회결과</span>
                <p class="totalNumText" >총&nbsp;<span>18,203</span>건</p>
              </div>
               <div className="flex gap-2"> 
                <Button label="저장" className="btn-28-intable" severity="secondary" outlined /> 
                <Button label="엑셀 다운로드" className="btn-28-sec" severity="secondary" outlined /> 
                <Button label="검색" className="btn-28-master" severity="secondary" outlined />
              </div>
            </div>
        </div>


        {/* 공통 : ag그리드  */}
        <div className="guidetitle mt-10">4.버튼 재정의 </div>
        <div className="flex flex-wrap gap-10">
            <div className="flex gap-2"> 
              <Button label="저장" className="btn-28-intable" severity="secondary" outlined /> 
              <Button label="엑셀 다운로드" className="btn-28-sec" severity="secondary" outlined /> 
              <Button label="검색" className="btn-28-master" severity="secondary" outlined />
            </div>
            <div className="flex gap-2"> 
              <Tag severity="contrast" value="대리점"></Tag>
              <Tag severity="success" value="본사"></Tag>
              <Tag severity="info" value="협력사"></Tag>
              <Tag severity="secondary" value="관리자"></Tag>
            </div>
        </div>  


         {/* 공통 : ag그리드  */}
        <div className="guidetitle mt-10">5.input 재정의 </div>
        <div className=" flex flex-wrap">
           
            <div className="flex flex-wrap gap-4"> 
              <div class="flex flex-wrap w-full items-center gap-4">
                <div>
                  <label for="firstname5" class="p-sr-only mr-4">기본 input </label>
                  <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  
                </div>
                 <div>
                  <label for="firstname5" class="p-sr-only mr-4">Disable </label>
                  <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"  disabled={true}/>  
                </div>
                
                 <div>
                  <label for="firstname5" class="p-sr-only mr-4">숫자만 입력 </label>
                  <InputText
                    value={value}
                    onChange={(e) => {
                      const onlyNum = e.target.value.replace(/[^0-9]/g, "");  // 숫자만
                      setValue(onlyNum);
                    }}
                    placeholder="숫자만 입력해주세요"
                  />
                </div>
                 <div className="flex relative">
                    <label for="firstname6" class="p-sr-only mr-4">입력시 </label>
                    <InputText
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="선택해주세요"
                      className="pr-8"   // X버튼 공간 확보
                    />
                    {value && (
                      <button
                        type="button"
                        onClick={() => setValue("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <i className="pi pi-times"></i>
                      </button>
                    )}
                  </div>

              </div>

               <div class="flex flex-wrap  w-full items-center gap-2">
                  <label for="firstname5" class="p-sr-only  mr-4">검색아이콘 input</label>
                  <div>
                  <IconField iconPosition="right">
                      <InputIcon className="pi pi-search"> </InputIcon>
                      <InputText placeholder="입력해주세요" />
                  </IconField>
                  </div>
                </div>
            </div>


            {/* 코드카피 */}
            <div className='flex flex-wrap w-full'>
               <CodeBox
                code={`
1. 기본 default
<label for="firstname5" class="p-sr-only">기본 input </label>
<InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  

2. input + search아이콘
<label for="firstname5" class="p-sr-only">검색아이콘 input</label>
<IconField iconPosition="right">
<InputIcon className="pi pi-search"> </InputIcon>
<InputText placeholder="입력해주세요" />
</IconField>

                  `}
              />
            </div>

        </div> 


        <div className="guidetitle mt-10">6.combo 재정의 </div>
        <div className=" flex">
           <div class="h_field flex items-center gap-2">
              <label for="firstname5" class="p-sr-only">기본 combo </label>
                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                  placeholder="선택해주세요"/>
            </div>

        </div> 


         <div className="guidetitle mt-10">7.radio & checkbox 정의</div>
        <div className=" flex">
          <div class="h_field flex items-center gap-2">
              <label for="firstname5" class="p-sr-only">라디오버튼 검색조건 </label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex align-items-center">
                      <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                      <label htmlFor="ingredient1" className="ml-2">주문</label>
                  </div>
                  <div className="flex align-items-center">
                      <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                      <label htmlFor="ingredient2" className="ml-2">납품번호</label>
                  </div>
              </div>
            </div>  

        </div> 
         <div className=" flex mt-4">
          <div class="h_field flex items-center gap-2">
              <label for="firstname5" class="p-sr-only">체크박스 검색조건 </label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex align-items-center">
                      <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
                      <label htmlFor="ingredient1" className="ml-2">Cheese</label>
                  </div>
                  <div className="flex align-items-center">
                      <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={onIngredientsChange} checked={ingredients.includes('Mushroom')} />
                      <label htmlFor="ingredient2" className="ml-2">Mushroom</label>
                  </div>
              </div>
            </div>  

        </div> 



         <div className="guidetitle mt-10">6.모달정의 resizable=false(모달사이즈 고정) / 드래그앤드랍=가능 / width와 height을 직접조절  </div>
        <div className=" flex flex-wrap gap-4">
            <Button label="1.모달 - 그리드" onClick={() => setVisible(true)} />
            <Dialog header="사용자정보 상세조회" visible={visible} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
               {/* 공통 : ag그리드  */}
                <div className="flex flex-wrap w-full">
                  
                  {/* 공통 : 그리드 상단 버튼  */}
                  <div className="hugreen_aggridbtn_hwrap">
                    <div className="flex">
                        <span className="NumText"> 조회결과</span>
                        <p className="totalNumText"> 총&nbsp;<span>18,203</span>건</p>
                    </div>
                    {/*  필요시 */}
                    <div className="flex gap-2"> 
                      <Button label="확인" className="btn-28-sec" severity="secondary" outlined /> 
                    </div>
                  </div>
                  {/* 공통 : 그리드 - 모달은 vh를 작성해야 함!  */}
                  <div className="hugreen_aggrid_hwrap" style={{height: "40vh"}}>
                    <CustomAgGrid
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
                  
                </div>
            </Dialog>  

             <Button label="2.모달 (검색 + 그리드)" onClick={() => setVisible5(true)} />
            <Dialog header="2.모달" visible={visible5} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => setVisible5(false)} footer={footerContent}>
                {/* 공통 : ag그리드  */}
                <div className="flex flex-wrap w-full">

                   {/* 공통 검색영역(PC+모바일대응) */}
                   <div className="hugreen_grid flex-1 flex flex-wrap">
                  
                        {/* PC (md 이상) */}
                        <div className="hugreen_searchwrap hidden md:flex transition-all duration-300">
                          <div className="flex w-[90%]" >
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
                    {/*  필요시 */}
                    <div className="flex gap-2"> 
                      <Button label="필요시 버튼영역" className="btn-28-sec" severity="secondary" outlined /> 
                    </div>
                  </div>
                  {/* 공통 : 그리드 - 모달은 vh를 작성해야 함!  */}
                  <div className="hugreen_aggrid_hwrap" style={{height: "40vh"}}>
                    <CustomAgGrid
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
                  
                </div>
            </Dialog>  


            <Button label="3.모달 - 상세화면" onClick={() => setVisible2(true)} />
            <Dialog header="3.상세화면" visible={visible2} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => setVisible2(false)} footer={footerContent}>
                
                {/* 공통 : ag그리드  */}
                <div className="flex w-full" style={{ height: '40vh' }}>
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


            <Button label="4.모달 -  상세+입력 MIX형" onClick={() => setVisible3(true)} />
            <Dialog header="4.사용자정보 상세조회" visible={visible3} modal={false} resizable={false}  className="user-dialog" onHide={() => setVisible3(false)} footer={footerContent}>
                
                {/* 공통 : ag그리드  */}
                <div className="flex w-full">
                  <div className="grid-view">
                      <div className="row">
                        <div className="th">참여대상</div>
                        <div className="td">(유)대명엔지니어링 </div>
                      </div>
                      <div className="row">
                        <div className="th">문의전화</div>
                        <div className="td">02-433-8996</div>
                      </div>

                      <div className="row">
                        <div className="th">비밀번호</div>
                        <div className="td"><InputText className='w-full' value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  </div>
                      </div>

                      <div className="row">
                        <div className="th">비밀번호확인</div>
                        <div className="td"><InputText className='w-full' value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>  </div>
                      </div>
                      <div className="row">
                        <div className="th">신청기간</div>
                        <div className="td">2025-10-16 09:00 ~ 2025-12-31 09:00</div>
                      </div>
                    </div>
                  </div>
            </Dialog>
            
            
          
        </div> 



      <div className="guidetitle mt-10">8.파일 업로드 </div>
        <div className=" flex">
         <div className='flex flex-wrap gap-2'>
              <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="선택해주세요"/>
              <Button label="찾아보기" className="btn-32-intable" severity="secondary" outlined onClick={() => setVisible4(true)}/> 
              <Dialog header="공통-파일첨부" visible={visible4} modal={false} resizable={false} style={{ width: '50vw' }} className="user-dialog" onHide={() => setVisible4(false)} footer={footerContent4}>
                  {/* 공통 : ag그리드  */}
                  <div className="flex flex-wrap">
                    <FileUpload name="demo[]" className="w-full" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0"> 업로드 파일을 등록해 주세요. </p>} />

                  </div>
              </Dialog>  
            </div>
        </div> 




         <div className="guidetitle mt-10">9. 메시지 팝업 </div>
        <div className=" flex">
          <div className='flex flex-wrap gap-2'>
              <ConfirmDialog />
              <Button onClick={confirm1}  label="저장 예시"></Button>
              <Button onClick={confirm2}  label="삭제 예시"></Button>
            </div>
        </div> 





      
    </div>
    
    

  );
};

export default Example02;
