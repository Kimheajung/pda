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
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar';


import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';



const Layout03 = () => {
  /* 달력 */
  const [date, setDate] = useState(null);

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
  const footerContent = (
          <div className="gap-2">
              <Button label="취소"  onClick={() => setVisible(false)} outlined className='mr-2'/>
              <Button label="적용"  onClick={() => setVisible(false)} autoFocus />
          </div>
      );

      
  return (
    <div className="card" style={{paddingbottom: "100px"}}>  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>3.입력형 테이블 레이아웃</h2>
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
        <div className="hugreen_grid flex flex-1 flex-wrap md:flex-row">
           

            {/* 테이블 입력 형태 - case-01*/}
            <div className="guidetitle">1. 1컬럼 입력형태 </div>
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--2col">
                <div className="row">
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                </div>

                <div className="row">
                  <div className="th">내용</div>
                  <div className="td">
                    <textarea className="p-inputtextarea w-full h-[180px]" placeholder="입력해주세요" data-pc-name="inputtextarea" data-pc-section="root"></textarea>
                  </div>
                </div>

                <div className="row">
                   <div className="th">내용작성</div>
                  <div className="td w-full">
                    <Editor value={text} className="flex-wrap w-full"  onTextChange={(e) => setText(e.htmlValue)}  />
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
                            <FileUpload name="demo[]" className="w-full" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0"> 업로드 파일을 등록해 주세요. </p>} />
      
                          </div>
                      </Dialog>                        
                    </div>
                  </div>
                </div>
              </div>
            </div>



              {/* 테이블 입력 형태 - case-02*/}
            <div className="guidetitle">2. 2컬럼 입력형태 </div>
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--4col">
                <div className="row">
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                </div>

                <div className='row'>                  
                  <div className="th">조회수</div>
                  <div className="td merge-3"><InputText className='w-full' value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>


              </div>
            </div>



             {/* 테이블 입력 형태 - case-02*/}
              <div className="guidetitle">3. 3컬럼 입력형태 </div>
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--6col">
                <div className="row">
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

              </div>
            </div>


            {/* 테이블 입력 형태 - case-02*/}
            <div className="guidetitle">4. 혼합형 입력형태</div>
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--6col">
                <div className="row">
                  <div className="th">협력업체 기본자재코드</div>
                  <div className="td merge-3"><InputText value={value} className='w-full' onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                 <div className="row">
                  <div className="th">제목</div>
                  <div className="td merge-5"><InputText value={value} className='w-full' onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>

                <div className="row">
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>


              </div>
            </div>



             {/* 테이블 입력 형태 - case-02*/}
             <div className="guidetitle">5. 혼합형 입력 + text 형태</div>
            <div className="flex w-full">
             <div className="dtv-info-grid dtv-info-grid--6col">
                <div className="row">
                  <div className="th required">협력업체 기본자재</div>
                  <div className="td merge-3"> <div className="span">(주)금호화확기술연구소 대전지사</div>  </div>
                  <div className="th">기간</div>
                  <div className="td">
                     <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon /> 
                      <span className='p-1'> - </span>
                    <Calendar value={date} className="w-full" onChange={(e) => setDate(e.value)} showIcon />   
                  </div>
                </div>

                 <div className="row">
                  <div className="th">제목</div>
                  <div className="td merge-5">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>                    
                  </div>
                </div>

                <div className="row">
                  <div className="th required">조회수</div>
                  <div className="td">
                     <div className="span">90,000,000,000 원</div>
                  </div>
                  <div className="th">조회수</div>
                  <div className="td">
                     <IconField iconPosition="right">
                          <InputIcon className="pi pi-search"> </InputIcon>
                          <InputText placeholder="입력해주세요" />
                      </IconField>
                  </div>
                  <div className="th">제목</div>
                  <div className="td"><InputText value={value} onChange={(e) => setValue(e.target.value)}  placeholder="입력해주세요"/>  </div>
                </div>


              </div>
            </div>



        </div>      
    </div>
    
    

  );
};

export default Layout03;
