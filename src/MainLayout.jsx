
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import PrimeReact from 'primereact/api';
import { AppTopbar } from './AppTopbar';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';
import { AppFooter } from './AppFooter';

export default function MainLayout({ children }) {
  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('light');
  const [inputStyle, setInputStyle] = useState('outlined');
  const [ripple, setRipple] = useState(false);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef(null);
  const location = useLocation();

  PrimeReact.ripple = false;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    document.body.classList.toggle('body-overflow-hidden', mobileMenuActive);
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef.current?.updateTargetEvents?.();
  }, [location]);

  const onInputStyleChange = (v) => setInputStyle(v);
  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };
  const onLayoutModeChange = (m) => setLayoutMode(m);
  const onColorModeChange = (m) => setLayoutColorMode(m);

  const onWrapperClick = () => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    if (!mobileTopbarMenuClick) setMobileTopbarMenuActive(false);
    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const [sidebarShift, setSidebarShift] = useState(false);
 const [menuIconToggle, setMenuIconToggle] = useState(false);
 
  const onToggleMenuClick = (e) => {
    menuClick = true;
    if (window.innerWidth >= 992) {
      if (layoutMode === 'overlay') {
        if (mobileMenuActive) setOverlayMenuActive(true);
        setOverlayMenuActive((s) => !s);
        setMobileMenuActive(false);
      } else {
        setStaticMenuInactive((s) => !s);
      }
    } else {
      setMobileMenuActive((s) => !s);
    }
    setSidebarShift((s) => !s); //left영역 남겨 놓는 ui추가
    setMenuIconToggle(prev => !prev);   // 아이콘 전환
    e.preventDefault();
  };



  const onSidebarClick = () => {
    menuClick = true;
  };
  const onMobileTopbarMenuClick = (e) => {
    mobileTopbarMenuClick = true;
    setMobileTopbarMenuActive((s) => !s);
    e.preventDefault();
  };
  const onMobileSubTopbarMenuClick = (e) => {
    mobileTopbarMenuClick = true;
    e.preventDefault();
  };
  const onMenuItemClick = (evt) => {
    if (!evt.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  
// AppLayout.jsx
const [activeLeftMenu, setActiveLeftMenu] = useState(null);

  const menu = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: '', to: '/' }],
    },
    {
      label: '컴포넌트',
      items: [
        { label: '1. 예제', icon: '', to: '/example' },
        { label: '2. 컴포넌트', icon: '', to: '/example02' },
        { label: '3. 검색영역', icon: '', to: '/example04' },
        { label: '4. 상세 테이블', icon: '', to: '/example03' },
        { label: '5. 입력형 테이블', icon: '', to: '/layout03' },
      ],
    },
    {
      label: '레이아웃',
      items: [
        { label: '페이지 목록', icon: '', to: '/layout07' },
        { label: '1. 레이아웃', icon: '', to: '/layout01' },
        { label: '2. 검색 + 그리드', icon: '', to: '/layout02' },
        { label: '3. 검색+상세보기+그리드', icon: '', to: '/layout04' },
        { label: '4. 좌우 레이아웃', icon: '', to: '/layout05' },
        { label: '5. 위아래 레이아웃', icon: '', to: '/layout06' },
        { label: '6. 그리드만 있는 레이아웃', icon: '', to: '/layout08' },
        { label: '7. 공지사항(CRUD) 레이아웃', icon: '', to: '/layout09' },
        { label: "8. 레이아웃 다중분할", icon: '', to: '/layout10' },
        { label: "9. 레이아웃 위아래 다중분할", icon: '', to: '/layout11' },
      ],
    }
    // ... 필요 메뉴 그대로 복사
  ];

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive':
      staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active':
      overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false,
    'layout-theme-light': layoutColorMode === 'light',
  });
  

  // TOP 버튼 노출 여부
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 최상단 이동 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={wrapperClass} onClick={onWrapperClick} >
      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={'light'}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />

      <div  className={`layout-sidebar ${sidebarShift ? 'sidebar-shift' : ''}`} onClick={onSidebarClick}>
        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          menuIconToggle={menuIconToggle}
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={'light'}
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">{children}</div>

        {/*  페이지 top */}
        {showTopBtn && (
         <button
            onClick={scrollToTop}
            className="top-button"
          >
            <i className="pi pi-arrow-up text-xl"></i>
          </button>
        )}
      </div>

       <AppFooter
          model={menu}
          onMenuItemClick={onMenuItemClick}
          menuIconToggle={menuIconToggle}
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={'light'}
        />

      {/* 임시삭제 */}
      <AppConfig
        rippleEffect={ripple}
        onRippleEffect={onRipple}
        inputStyle={inputStyle}
        onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode}
        onLayoutModeChange={onLayoutModeChange}
        layoutColorMode={'light'}
        onColorModeChange={onColorModeChange}
      />

      {/* 모바일 모드 */}
      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
}
