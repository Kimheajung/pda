import { useCallback, useMemo, useRef, useState, useEffect  } from 'react';
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import DataGrid from '@components/grid/DataGrid';
import MOCK_DATA3 from '@components/grid/MOCK_DATA3.json';



const Layout07 = () => {
  /* 모바일 검색영역 감추기 */
  const [activeIndex, setActiveIndex] = useState(null);
  
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

 const tableData = [

      // 업데이트 공유내용
    { group: "업데이트 공유내용", title: "1.컴포넌트 > 검색유형 추가", link: "", desc: "", status: "업로드완료", date: "25.11.28" },
    { group: "업데이트 공유내용", title: "2.TOP GnB 업데이트(설정은 미완료)", link: "", desc: "", status: "업로드완료", date: "25.11.28" },
    { group: "업데이트 공유내용", title: "3.공지사항 CRUD화면 추가", link: "", desc: "/layout09", status: "업로드완료", date: "25.11.28" },
    { group: "업데이트 공유내용", title: "4.업무매뉴얼 가이드(입력모달 포함)", link: "/layout01", desc: "", status: "업로드완료", date: "25.11.28" },
    { group: "업데이트 공유내용", title: "5.메뉴타이틀 + 새창+즐겨찾기 아이콘", link: "/layout01", desc: "", status: "업로드완료", date: "25.11.28" },
    { group: "업데이트 공유내용", title: "6.컴포넌트에 공통 아이디찾기, 우편번호찾기등 모달 추가", link: " ", desc: "", status: "업로드완료", date: "25.12.02" },
    { group: "업데이트 공유내용", title: "7.건자재PC 업무화면은 기존화면과 검토필요", link: " ", desc: "", status: "업로드완료", date: "25.12.02" },
    { group: "업데이트 공유내용", title: "8.시스템 업무화면은 기존화면과 검토필요-기존과 다르게 모달팝업유형추가! 때에 따라 사용", link: " ", desc: "", status: "업로드완료", date: "25.12.02" },


    // 공통업무화면
    { group: "공통업무화면", title: "1.데시보드", link: "/example02", desc: "", status: "작업전", date: "25.11.18" },
    { group: "공통업무화면", title: "2.기준-레이아웃", link: "/layout01", desc: "", status: "작업완료", date: "25.11.18" },
    { group: "공통업무화면", title: "3.로그인", link: "/example02", desc: "", status: "작업전", date: "25.11.18" },
    { group: "공통업무화면", title: "4.데시보드", link: "/example02", desc: "", status: "작업전", date: "25.11.18" },
    { group: "공통업무화면", title: "5.제품코드 발번요청", link: "/example02", desc: "", status: "작업전", date: "25.11.18" },

    // PDA
    { group: "PDA", title: "********1월부터 진행예정********", link: "/", status: " ", date: " " },
    { group: "PDA", title: "1.입고 / 자가생산입고(개별)", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "2.입고 / 자가생산입고(일괄)", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "3.입고 / 자가생산 입고내역조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "4.입고 / 외주생산입고(개별)", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "5.입고 / 외주생산입고(일괄)", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "6.입고 / 반품입고", link: "/layout06", status: "작업전", date: "25.11.18" },

    { group: "PDA", title: "7.출고 / 생산투입 대상조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "8.출고 / 생산투입", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "9.출고 / 생산투입 내역조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "10.출고 / 판매출고", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "11.출고 / 판매출고 내역조회", link: "/layout06", status: "작업전", date: "25.11.18" },

    { group: "PDA", title: "12.기타 / 기타출고", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "13.기타 / 재고변경", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "14.기타 / 재고이동", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "15.기타 / 재고실사 계획조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "16.기타 / 재고실사등록", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "17.기타 / 팔렛병합", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "18.기타 / 팔렛정보조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "PDA", title: "19.기타 / 제품검수", link: "/layout06", status: "작업전", date: "25.11.18" },


    // 라벨발행
    { group: "라벨발행", title: "********12월부터 진행예정********", link: "/", status: " ", date: " " },
    { group: "라벨발행", title: "1.자가생산 라벨발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "2.자가생산 라벨발행 이력조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "3.외주생산라벨발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "4.외주생산라벨발행 이력조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "5.영업반품 라벨발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "6.영업반품 라벨발행 이력조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "7.제품라벨발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "8.제품라벨발행 이력조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "9.재고라벨발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "10.재고라벨발행 이력조회", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "11.잔량라벨 수동발행", link: "/layout06", status: "작업전", date: "25.11.18" },
    { group: "라벨발행", title: "12.프로그램설정", link: "/layout06", status: "작업전", date: "25.11.18" },

    // 건자재PC
    { group: "건자재PC", title: "1.건설현장 > 현장정보등록", link: "/Page01", desc: "", status: "작업중", date: "25.12.01" },
    { group: "건자재PC", title: "1.건설현장 > 기타견적업로드", link: "/Page02", desc: "", status: "작업완료", date: "25.12.01" },
    { group: "건자재PC", title: "2.코드관리 > 속성마스터", link: "/Page03", desc: "", status: "작업완료", date: "25.12.01" },
    { group: "건자재PC", title: "2.코드관리 > 계층정보", link: "/Page04", desc: "", status: "작업완료", date: "25.12.01" },
    { group: "건자재PC", title: "2.코드관리 > 금형마스터", link: "/Page05", desc: "", status: "작업완료", date: "25.12.01" },
    { group: "건자재PC", title: "2.코드관리 > 제품코드생성(프로파일)", link: "/Page06", desc: "", status: "작업완료", date: "25.12.02" },
    { group: "건자재PC", title: "2.코드관리 > 제품코드생성(부자재)", link: "/Page07", desc: "", status: "작업완료", date: "25.12.02" },

    { group: "건자재PC", title: "3.자가생산관리 > 생산접수(B)", link: "/Page08", desc: "", status: "작업완료", date: "25.12.02" },
    { group: "건자재PC", title: "3.자가생산관리 > 현황등록(B)", link: "/Page09", desc: "", status: "작업완료", date: "25.12.02" },
    { group: "건자재PC", title: "3.자가생산관리 > 생산현황(B)", link: "/Page10", desc: "", status: "작업완료", date: "25.12.02" },
    { group: "건자재PC", title: "3.자가생산관리 > 현황등록", link: "/Page11", desc: "", status: "작업완료", date: "25.12.02" },

    { group: "건자재PC", title: "4.비용관리 > 회계전표등록(이하동일 - 입력양식)", link: "/Page12", desc: "", status: "작업완료", date: "25.12.02" },

    { group: "건자재PC", title: "5.시스템관리 > 절단길이등록", link: "/Page13", desc: "", status: "작업완료", date: "25.12.03" },
    { group: "건자재PC", title: "5.시스템관리 > 사용자조회(등록, 상세화면 모달타입으로 구현)", link: "/Page14", desc: "", status: "작업완료", date: "25.12.03" },
    { group: "건자재PC", title: "5.시스템관리 > 업체조회", link: "/Page15", desc: "", status: "작업완료", date: "25.12.03" },

    
    { group: "건자재PC", title: "6.주문관리 > 주문입력", link: "/Page16", desc: "", status: "작업완료", date: "25.12.03" },
    { group: "건자재PC", title: "6.주문관리 > 주문접수현황", link: "/Page17", desc: "", status: "작업완료", date: "25.12.03" },
    { group: "건자재PC", title: "6.주문관리 > DC현황조회", link: "/Page18", desc: "", status: "작업완료", date: "25.12.03" },

    
    { group: "건자재PC", title: "7.여신관리 > 여신정보조회", link: "/Page19", desc: "", status: "작업완료", date: "25.12.03" },

    
    { group: "건자재PC", title: "8.재고관리 > 기초재고등록", link: "/Page20", desc: "", status: "작업완료", date: "25.12.03" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "작업중":
        return "blue";   
      case "작업완료":
        return "text-red-400";    
      case "작업전":
        return "text-gray-400 line-through";       
      case "업로드완료":
        return "#008000";       
      default:
        return "text-black-600 ";
    }
  };

  // 메뉴 필터링 상태
  const [selectedMenu, setSelectedMenu] = useState("건자재PC");

  const menuList = ["전체", "업데이트 공유내용", "공통업무화면", "PDA", "라벨발행", "건자재PC"];

  const filteredData =
    selectedMenu === "전체"
      ? tableData
      : tableData.filter((item) => item.group === selectedMenu);

  // rowSpan 계산용
  const groupCounts = filteredData.reduce((acc, item) => {
    acc[item.group] = (acc[item.group] || 0) + 1;
    return acc;
  }, {});

  let printedGroup = {};


  return (
    <div className="card" style={{background: "yellow"}}>  
        {/* 공통 : 타이틀영역 */}
        <div className="title-container">
            <div  className="flex gap-2">
              <h2>파일 Path</h2>
              
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


       
        {/* 임시용 테이블 형태 */}
        <div className="flex gap-2 mb-2 text-lg mt-2">
        {menuList.map((menu) => (
          <span
            key={menu}
            onClick={() => setSelectedMenu(menu)}
            className={`
              cursor-pointer px-3 py-1 rounded 
              text-[12px] md:text-base
              ${selectedMenu === menu ? "bg-blue-500 text-white" : "hover:underline"}
            `}
          >
            {menu}
          </span>
        ))}
      </div>

      {/* 임시용 테이블 */}
      <table className="table-basic">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>

        <thead>
          <tr>
            <th>1depth</th>
            <th>2depth</th>
            <th>설명</th>
            <th className="text-right">작업여부</th>
            <th className="text-right">작업일시</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              {!printedGroup[item.group] ? (
                <td rowSpan={groupCounts[item.group]}>
                  {item.group}
                  {(() => (printedGroup[item.group] = true))()}
                </td>
              ) : null}

              <td>
                <Link className={`text-right ${getStatusClass(item.status)}`} to={item.link}>
                  {item.title}
                </Link>
              </td>

              <td className="text-green-600">{item.desc}</td>
              <td className="text-right">{item.status}</td>
              <td className="text-right">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
        
        
    </div>
  );
};

export default Layout07;
