import React, { useState, useRef } from 'react';
import { Link,useLocation } from 'react-router-dom';
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

function getTitleByPath(menu, pathname) {
  for (const group of menu) {
    for (const item of group.items) {
      if (item.to === pathname) {
        return item.label;
      }
    }
  }
  return 'Hugreen 건자재 바코드 시스템'; // fallback
}


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


const navigate = useNavigate();
const handleCloseMenu = () => setMegaMenuVisible(false);

  const location = useLocation();
  const isMain = location.pathname === '/';
  const title = getTitleByPath(props.menu, location.pathname);

    return (
        <div className="layout-topbar_wrap relative">
            <div className="layout-topbar" >
               
          <div className='flex'>
            {/* 모바일용 전체메뉴 버튼 */}
            {!isMain && (
              <button
                type="button"
                className="p-link layout-menu-button block lg:hidden"
                onClick={() => navigate('/') }
              >
                <i className="pi pi-chevron-left" />
              </button>
            )}

            {/* 타이틀 */}
            <Link to="/" className="layout-topbar-logo truncate">
              <span className="font-medium">
                {isMain ? 'Hugreen 건자재 바코드 시스템' : title}
              </span>
            </Link>
          </div>

           
            {/* 모바일 모드시 나오는 아이콘 */}
            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={() => setMobileMenuVisible(true)}>
                <i className="pi pi-user" />
            </button>
            
            
              {/* 모바일 : 왼쪽영역설정 */}
              <Sidebar
                  visible={mobileMenuVisible}
                  position="right"
                  onHide={() => setMobileMenuVisible(false)}
                  showCloseIcon={false}
                  header={null}
                  blockScroll
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
                            value="사번"
                            className="mypage-profile__role"
                            rounded />
                          <span className="mypage-profile__name">황윤경님</span>   
                          <span className="mypage-profile__num">(102872)</span>                     
                          {/*<i className="pi pi-chevron-right mypage-profile__arrow" />  아이콘 필요시 사용 */}
                        </div>
                        <p className="mypage-profile__company">소속 : (주) 금호석유화학</p>
                      </div>
                    </div>
                    <Button
                      label="Logout"
                      className="mypage-profile__logout p-button-sm" />
                  </section>

                  {/* 메뉴 리스트 */}
                  <Button type="button" className="mypage-linkrow p-button-text"  label="회원정보 및 비밀번호 변경" icon="pi pi-chevron-right" iconPos="right" />
                  <Button type="button" className="mypage-linkrow p-button-text"  label="알림" icon="pi pi-chevron-right" iconPos="right" />
                  <Button type="button" className="mypage-linkrow p-button-text"  label="설정" icon="pi pi-chevron-right" iconPos="right" />

                 
                </main>
              </div>

              </Sidebar>

               
          </div>
        </div>
    );
}


