import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import { MegaMenu } from 'primereact/megamenu';
import { CSSTransition } from "react-transition-group";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";

export const AppTopbar = (props) => {

const [activeMenu, setActiveMenu] = useState(' ');

const topMenus = [
  { label: "01.컴포넌트", path: "/example02" },
  { label: "02.레이아웃", path: "/layout01" },
  { label: "03.path목록", path: "/layout07" },   
  { label: "04.그리드샘플", path: "/sample00" }
];

  // 툴팁
  const bellRef = useRef(null);

  // 권한별 색상 다르게
  // 관리자:admin / 대리점:agency / 본사 : office / 협력사 :  partner
  const role = "partner";
  const roleLabelMap = {
  admin: "관리자",
  partner: "협력사",
  agency: "대리점",
  office: "본사",
};

  /* 업무영역 도움말 패널영역 정의 */
  const [visibleRight, setVisibleRight] = useState(false);

  // 모바일에서 버튼 클릭시오른쪽 config영역 
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const containerRef = useRef(null);

  //oerlay 패널
  const op = useRef(null);  
  const op2 = useRef(null);

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
                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={() => setMobileMenuVisible(true)}>
                    <i className="pi pi-ellipsis-v" />
                </button>

               
                 {/* 모바일 : 오른쪽영역설정 */}
        <Sidebar
              visible={mobileMenuVisible}
              position="right"
              onHide={() => setMobileMenuVisible(false)}
              className="mobile-topbar-sidebar lg:hidden">

    <div className="mypage" >

      {/* 뒤로가기 + 제목 */}
      <div className="mypage-header">
        <Button
          type="button"
          className="mypage-header__back"
          icon="pi pi-chevron-left"
          rounded
          text
          onClick={() => navigate(-1)}  
        />
        <span className="mypage-header__title">마이페이지</span>
      </div>

      <main className="mypage-body">
        {/* 프로필 카드 */}
        <section className="mypage-profile">
          <div className="mypage-profile__left gap-4">
            <Avatar
              label=""
              icon="pi pi-user"
              className="mypage-profile__avatar"
              shape="circle"
            />
            <div className="mypage-profile__info">
              <div className="mypage-profile__row">
                <Tag
                  value="대리점"
                  className="mypage-profile__role"
                  rounded />
                <span className="mypage-profile__name">이가명님</span>
                <i className="pi pi-chevron-right mypage-profile__arrow" />
              </div>
              <p className="mypage-profile__company">(주) 금호석유화학</p>
            </div>
          </div>
          <Button
            label="Logout"
            className="mypage-profile__logout p-button-sm" />
        </section>

        {/* 메뉴 리스트 */}
        <Button type="button" className="mypage-linkrow p-button-text"  label="회원정보 및 비밀번호 변경" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="알림" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="생산출하일정" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="통합자료 다운로드" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="대리점 VOC" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="제품코드 발번요청" icon="pi pi-chevron-right" iconPos="right" />
        <Button type="button" className="mypage-linkrow p-button-text"  label="설정" icon="pi pi-chevron-right" iconPos="right" />

        {/* 메뉴 리스트 
        <section className="mypage-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="mypage-menu__item"
              type="button"
            >
              <span className="mypage-menu__label">{item.label}</span>
              {item.hasToggle && (
                <i className="pi pi-chevron-right mypage-menu__icon" />
              )}
            </button>
          ))}
        </section>*/}
      </main>
    </div>

          </Sidebar>


                {/* PC- 아이콘영역  */}
                <ul className={classNames("layout-topbar-menu lg:flex origin-top" )}>
                    <li>
                        <Tooltip target=".has-tooltip" position="bottom" mouseTrack mouseTrackTop={15} />
                        <button data-pr-tooltip="공지사항" className="p-link layout-topbar-button has-tooltip relative">
                            <span className="relative inline-flex">
                              <i className="pi pi-bell" />
                              <Badge value="2" severity="danger" className="absolute -top-3 -right-3" />
                            </span>
                        </button>
                    </li>
                    <li>
                        <Tooltip target=".has-tooltip" position="bottom" mouseTrack mouseTrackTop={15} />
                        <button data-pr-tooltip="제품코드 발번요청" className="p-link layout-topbar-button has-tooltip">
                            <i className="pi pi-barcode" />
                        </button>
                    </li>
                    <li>
                        <button data-pr-tooltip="설정" className="p-link layout-topbar-button has-tooltip" onClick={(e) => op.current.toggle(e)} >
                            <i className="pi pi-cog"/>
                        </button>
                          <OverlayPanel ref={op} >
                          <div className="flex flex-wrap">
                            <ul>
                              <li>
                                <div  className='mb-4'><span> 주요메뉴 바로가기 </span></div>
                              </li>
                              <li>
                                <Button unstyled className="account-overlay__item-btn" label="자료 다운로드" />
                              </li>
                              <li>
                                <Button unstyled className="account-overlay__item-btn" label="대리점 VOC" />
                              </li>
                              <li>
                                <Button unstyled className="account-overlay__item-btn" label="자유게시판" />
                              </li>
                              <li>
                                <Button unstyled className="account-overlay__item-btn" label="Q & A" />
                              </li>
                            </ul>
                          </div>
                          </OverlayPanel>
                    </li>
                     <li>
                        
                        <button data-pr-tooltip="나의 즐겨찾기 메뉴" className="p-link layout-topbar-button has-tooltip" onClick={() => setVisibleRight(true)}>
                            <i className="pi pi-bookmark"/>
                        </button>
                    </li>
                    <li>
                        
                        <button data-pr-tooltip="내 정보" className="p-link layout-topbar-button has-tooltip" onClick={(e) => op2.current.toggle(e)} >
                            <i className="pi pi-user"/>
                        </button>
                        <OverlayPanel ref={op2} >
                        <div className="account-overlay__inner">
                            <div className="account-overlay__item" >
                                <div className="account-overlay__item-main">
                                    <div className={`account-overlay__circle account-overlay__circle--${role}`}> 
                                      {roleLabelMap[role] ?? "사용자"}
                                    </div>
                                <div>
                                <span className="account-overlay__badge">(주) 금호석유화학</span>
                                <div className="account-overlay__name">김혜정 차장 </div>
                                </div>
                              </div>
                            </div>
                            <Button unstyled className="account-overlay__item-btn" label="비밀번호변경" />
                            <Button unstyled className="account-overlay__item-btn" label="정보변경" />   
                            <Button unstyled className="account-overlay__item-btn" label="나만의 즐겨찾기 메뉴" />                            
                            <Button unstyled className="account-overlay__logout" label="로그아웃" />
                        </div>
                        </OverlayPanel>
                    </li>
                </ul>
            </div>

            {/* 공통 : 업무영역에 대한 도움말 사이드바 */}
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="favorite-sidebar">
              <h3 className="absolute top-[1.6rem]"> 나만의 즐겨찾기 메뉴</h3>

                {/* 즐겨찾기 항목이 아예 없을 때 */}
                <div className="favorite-empty">
                  <i className="pi pi-info-circle favorite-empty__icon"></i>
                  <span className="favorite-empty__text">나만의 즐겨찾기 메뉴가 없습니다.</span>
                </div>

                {/* 즐겨찾기 목록 리스트 - 하드코딩 */}
                <div className="favorite-list">
                  <div className="favorite-item">
                    주문입력
                    <Button
                      icon="pi pi-times"
                      className="favorite-del-btn p-button-text p-button-plain no-theme"
                      onClick={() => console.log('delete')}
                      unstyled
                    />
                  </div>

                  <div className="favorite-item">
                    PALLET 재고조회
                    <Button 
                      icon="pi pi-times" 
                      rounded 
                      text 
                      className="favorite-del-btn" 
                      />
                  </div>
                </div>
            </Sidebar>
            

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


