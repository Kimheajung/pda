
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
  const [showFooter, setShowFooter] = useState(true);
  const lastScrollY = useRef(0);

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
      label: '입고',
      items: [
        { label: '자가생산입고(개별)', icon: '', to: '/in01' },
        { label: '자가생산입고(일괄)', icon: '', to: '/in02' },
        { label: '자가생산입고내역조회', icon: '', to: '/in03' },
        { label: '외주생산입고(개별)', icon: '', to: '/in04' },
        { label: '외주생산입고(일괄)', icon: '', to: '/in05' },
        { label: '반품입고', icon: '', to: '/in06' },
      ],
    },
    {
      label: '출고',
      items: [
        { label: '생산투입대상조회', icon: '', to: '/out01' },
        { label: '생산투입', icon: '', to: '/out02' },
        { label: '생산투입내역조회', icon: '', to: '/out03' },
        { label: '판매출고', icon: '', to: '/out04' },
        { label: '판매출고내역조회', icon: '', to: '/out05' },
      ],
    },
    {
      label: '기타',
      items: [
        { label: '기타출고', icon: '', to: '/etc01' },
        { label: '재고변경', icon: '', to: '/etc02' },
        { label: '재고이동', icon: '', to: '/etc03' },
        { label: '재고실사계획조회', icon: '', to: '/etc04' },
        { label: '재고실사등록', icon: '', to: '/etc05' },
        { label: '팔렛병합', icon: '', to: '/etc06' },
        { label: '팔렛정보조회', icon: '', to: '/etc07' },
        { label: '제품검수', icon: '', to: '/etc08' },
      ],
    },
    {
      label: '컴포넌트',
      items: [
        { label: '1. 예제', icon: '', to: '/example' },
        { label: '2. 컴포넌트', icon: '', to: '/example02' },
        { label: '3. 검색영역', icon: '', to: '/example04' },
        { label: '4. 상세 테이블', icon: '', to: '/example03' },     
        { label: '5. 모바일 레이아웃 기준', icon: '', to: '/layout01' },   
        { label: '6. 로그인', icon: '', to: '/LoginSample' },
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



  // 최상단 이동 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

//스크롤감지
useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY;

    // Top 버튼
    setShowTopBtn(currentY > 200);

    // Footer: 아래로 → 숨김 / 위로 → 표시
    if (currentY > lastScrollY.current && currentY > 50) {
      setShowFooter(false);
    } else if (currentY < lastScrollY.current) {
      setShowFooter(true);
    }

    lastScrollY.current = currentY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  return (
    <div className={wrapperClass} onClick={onWrapperClick} >
      <AppTopbar
        menu={menu}
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

      <div className="layout-main-container" >
        <div className="layout-main">{children}</div>

        {/*  페이지 top*/}
        {showTopBtn && (
         <button
            onClick={scrollToTop}
            className="top-button"
          >
            <i className="pi pi-arrow-up text-xl"></i>
          </button>
        )} 
      </div>

       <div
        className={classNames(
          'fixed bottom-0 left-0 w-full z-50 transition-transform duration-300',
          {
            'translate-y-0': showFooter,
            'translate-y-full': !showFooter,
          }
        )}
      >
        <AppFooter
          model={menu}
          onMenuItemClick={onMenuItemClick}
          menuIconToggle={menuIconToggle}
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={'light'}
        />
      </div>

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
