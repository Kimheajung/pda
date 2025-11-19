import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MegaMenu } from 'primereact/megamenu';
import { CSSTransition } from "react-transition-group";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';

export const AppTopbar = (props) => {

 const [activeMenu, setActiveMenu] = useState(' ');

const topMenus = [
  { label: "01.컴포넌트", path: "/example02" },
  { label: "02.레이아웃", path: "/layout01" },
  { label: "03.path목록", path: "/layout07" },   
  { label: "04.그리드샘플", path: "/sample00" }
];

 

  const containerRef = useRef(null);
  //oerlay 패널
  const op = useRef(null);

//  메가메뉴 관련 상태 추가
 const [megaMenuVisible, setMegaMenuVisible] = useState(false); 
  const menuData = [
  {
    label: "여신관리",
    items: [
      { label: "외상매입 원장조회", to: '/example' },
      { label: "외상매입 집계조회", url: "/" },
      { label: "여신정보조회", url: "/" },
      { label: "거래명세서 조회", url: "/" },
    ],
  },
  {
    label: "주문관리",
    items: [
      { label: "주문입력", url: "/" },
      { label: "주문입력(환기창)", url: "/" },
      { label: "주문접숴현황", url: "/" },
      { label: "주문조회", url: "/" },
      { label: "주문진행현황", url: "/" },
      { label: "주문진행상태조회", url: "/" },
      { label: "출하현황조회", url: "/" },
      { label: "DC현황조회", url: "/" },
      { label: "절단길이조회", url: "/" },
      { label: "수신확인", url: "/" },
      { label: "주문진행상태조회", url: "/" },
    ],
  },
  {
    label: "PALLET관리",
    items: [
      { label: "PALLET 재고조회", url: "/" },
      { label: "PALLET 신규등록", url: "/" },
      { label: "PALLET 현황조회", url: "/" },
      { label: "PALLET 배분현황조회", url: "/" },
      { label: "PALLET 기준재고 초과현황조회", url: "/" },
      { label: "PALLET 재고마감", url: "/" },
      { label: "PALLET 수불현황조회", url: "/" },
      { label: "PALLET 입고내역조회", url: "/" },
      { label: "PALLET 등록", url: "/" },
      { label: "PALLET 출고내역조회", url: "/" },
    ],
  },
  {
    label: "전자서명",
    items: [
      { label: "채권채무확인", url: "/" },
      { label: "기성계약", url: "/" },
      { label: "채권채무(대리점)", url: "/" },
      { label: "취합현황(대리점)", url: "/" },
    ],
  },
  {
    label: "주문관리",
    items: [
      { label: "주문입력", url: "/" },
      { label: "주문입력(환기창)", url: "/" },
      { label: "주문접숴현황", url: "/" },
      { label: "주문조회", url: "/" },
      { label: "주문진행현황", url: "/" },
      { label: "주문진행상태조회", url: "/" },
      { label: "출하현황조회", url: "/" },
      { label: "DC현황조회", url: "/" },
      { label: "절단길이조회", url: "/" },
      { label: "수신확인", url: "/" },
      { label: "주문진행상태조회", url: "/" },
    ],
  },
  {
    label: "PALLET관리",
    items: [
      { label: "PALLET 재고조회", url: "/" },
      { label: "PALLET 신규등록", url: "/" },
      { label: "PALLET 현황조회", url: "/" },
      { label: "PALLET 배분현황조회", url: "/" },
      { label: "PALLET 기준재고 초과현황조회", url: "/" },
      { label: "PALLET 재고마감", url: "/" },
      { label: "PALLET 수불현황조회", url: "/" },
      { label: "PALLET 입고내역조회", url: "/" },
      { label: "PALLET 등록", url: "/" },
      { label: "PALLET 출고내역조회", url: "/" },
    ],
  },
  {
    label: "전자서명",
    items: [
      { label: "채권채무확인", url: "/" },
      { label: "기성계약", url: "/" },
      { label: "채권채무(대리점)", url: "/" },
      { label: "취합현황(대리점)", url: "/" },
    ],
  },
  {
    label: "주문관리",
    items: [
      { label: "주문입력", url: "/" },
      { label: "주문입력(환기창)", url: "/" },
      { label: "주문접숴현황", url: "/" },
      { label: "주문조회", url: "/" },
      { label: "주문진행현황", url: "/" },
      { label: "주문진행상태조회", url: "/" },
      { label: "출하현황조회", url: "/" },
      { label: "DC현황조회", url: "/" },
      { label: "절단길이조회", url: "/" },
      { label: "수신확인", url: "/" },
      { label: "주문진행상태조회", url: "/" },
    ],
  },
  {
    label: "PALLET관리",
    items: [
      { label: "PALLET 재고조회", url: "/" },
      { label: "PALLET 신규등록", url: "/" },
      { label: "PALLET 현황조회", url: "/" },
      { label: "PALLET 배분현황조회", url: "/" },
      { label: "PALLET 기준재고 초과현황조회", url: "/" },
      { label: "PALLET 재고마감", url: "/" },
      { label: "PALLET 수불현황조회", url: "/" },
      { label: "PALLET 입고내역조회", url: "/" },
      { label: "PALLET 등록", url: "/" },
      { label: "PALLET 출고내역조회", url: "/" },
    ],
  },
  {
    label: "전자서명",
    items: [
      { label: "채권채무확인", url: "/" },
      { label: "기성계약", url: "/" },
      { label: "채권채무(대리점)", url: "/" },
      { label: "취합현황(대리점)", url: "/" },
    ],
  },
];

const navigate = useNavigate();

const handleCloseMenu = () => setMegaMenuVisible(false);

    return (
        <div className="layout-topbar_wrap relative">
            <div className="layout-topbar">
               
            {/* PC용 메가메뉴 버튼 */}
            <button
                type="button"
                className="p-link layout-menu-button layout-topbar-button hidden lg:block" onClick={() => setMegaMenuVisible((prev) => !prev)}>
                <i className="pi pi-bars" />
            </button>
            {/* 모바일용 전체메뉴 버튼 */}
            <button
                type="button"
                className="p-link layout-menu-button layout-topbar-button block lg:hidden" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>



                <Link to="/" className="layout-topbar-logo">
                    <span>Hugreen</span>
                    <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                    <span>건자재 시스템</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 layout-topbar-menu lg:flex origin-top">
                    <div className="flex nowrap">
                         <div className="flex gap-2">
                          {topMenus.map(menu => (
                            <div
                              key={menu.label}
                              className={`top_menu_link ${activeMenu === menu.label ? "active" : ""}`}
                              onClick={() => {
                                setActiveMenu(menu.label);
                                navigate(menu.path);
                              }}
                            >
                              <span>{menu.label}</span>
                            </div>
                          ))}
                        </div>
                    </div>    
                </div> 
                
                
                {/* 모바일 모드시 나오는 아이콘 */}
                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                    <i className="pi pi-ellipsis-v" />
                </button>

                {/* PC- 아이콘영역  */}
                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                      <li>
                        <button className="p-link layout-topbar-button" >
                            <i className="pi pi-bell"/>
                            <span>공지사항</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={(e) => op.current.toggle(e)} >
                            <i className="pi pi-cog"/>
                            <span>설정</span>
                        </button>
                          <OverlayPanel ref={op}>
                          <div classNames="card">
                            <ul>
                              <li>
                                <div  classNames='mb-4'><span> 환경설정 </span></div>
                              </li>
                              <li>
                                <div><span> 거래명세서 조회 </span></div>
                              </li>
                              <li>
                                <div><span> 채권채무(대리점) </span></div>
                              </li>
                              <li>
                                <div><span> 주문접수관리 </span></div>
                              </li>
                              <li>
                                <div><span> PO별 생산계획 조회 </span></div>
                              </li>
                              <li>
                                <div><span> 구매요청등록 </span></div>
                              </li>
                            </ul>
                          </div>
                          </OverlayPanel>
                    </li>
                     <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-bookmark"/>
                            <span>나만의 즐겨찾기 메뉴</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user"/>
                            <span>개인정보변경</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Dim */}
            {megaMenuVisible && (
            <div 
                className="fixed inset-0 bg-black/30 z-40 hidden md:block"
                onClick={() => setMegaMenuVisible(false)}
            />
            )}

            {/* MegaMenu */}
            {megaMenuVisible && (
            <CSSTransition
                in={megaMenuVisible}
                timeout={400}
                classNames="fade-slide"
                unmountOnExit
            >
                <div className="megamenu-container">
                <div className="megamenu-wrapper flex flex-row justify-center p-4 gap-12 text-white">
                    {menuData.map((menu) => (
                        <div key={menu.label} className="megamenu-column">
                        <div className="megamenu-title">{menu.label}</div>
                        <div className="megamenu-items">
                            {menu.items.map((item) => (
                            <Link key={item.label} to={item.url} className="megamenu-link">
                                {item.label}
                            </Link>
                            ))}
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            </CSSTransition>
            )}


        </div>
    );
}


