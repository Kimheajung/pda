import React, { useState, useEffect, useRef,useMemo  } from 'react';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputSwitch } from 'primereact/inputswitch';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const DashboardMain = () => {
  //임시용 로그인
  const [visible, setVisible] = useState(false);
 const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [saveId, setSaveId] = useState(false);

  const isDisabled = useMemo(() => !id.trim() || !pw.trim(), [id, pw]);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 처리 연결
    console.log({ id, pw, saveId });
  };


  const cardRef = useRef(null);

useEffect(() => {
  if (visible) {
    requestAnimationFrame(() => {
      cardRef.current?.focus();
    });
  }
}, [visible]);


  /* ===============================
     기본 훅 / 참조
  =============================== */
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /* ===============================
     탭 상태 (URL ↔ state)
  =============================== */
  const tabParam = Number(searchParams.get('tab'));
  const safeIndex = [0, 1, 2].includes(tabParam) ? tabParam : 0;
  const [activeIndex, setActiveIndex] = useState(safeIndex);

  useEffect(() => {
    setActiveIndex(safeIndex);
  }, [safeIndex]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  /* ===============================
     자주쓰는 메뉴 토글
  =============================== */
  const [checked, setChecked] = useState(false);

  // 탭별 활성 메뉴
 const [checkedTabs, setCheckedTabs] = useState({
  0: false,
  1: false,
  2: false,
});

// 탭별 선택된 메뉴
const [favoriteMenus, setFavoriteMenus] = useState({
  0: null,
  1: null,
  2: null,
});

  /* ===============================
     메뉴 데이터
  =============================== */
  const inMenus = [
    { path: '/in01', lines: ['자가생산 입고 (개별)'], icon: 'pi pi-file-import' },
    { path: '/in02', lines: ['외주생산 입고 (개별)'], icon: 'pi pi-inbox' },
    { path: '/in03', lines: ['반품입고'], icon: 'pi pi-shopping-cart' },
    {
      //path: '/',
      lines: ['로그인 임시용'],
      icon: 'pi pi-sparkles',
      onClick: () => setVisible(true),  
    },
  ];

  

  const outMenus = [
    { path: '/in04', lines: ['생산투입'], icon: 'pi pi-car' },
    { path: '/in05', lines: ['판매출고'], icon: 'pi pi-desktop' },
  ];

  const etcMenus = [
    { path: '/in06', lines: ['기타출고'], icon: 'pi pi-clipboard' },
    { path: '/in07', lines: ['재고실사계획조회'], icon: 'pi pi-briefcase' },
    { path: '/in08', lines: ['재고변경'], icon: 'pi pi-building' },
    { path: '/in09', lines: ['재고이동'], icon: 'pi pi-building' },
    { path: '/in10', lines: ['팔렛병합'], icon: 'pi pi-cart-arrow-down' },
    { path: '/in11', lines: ['팔렛정보조회'], icon: 'pi pi-cart-arrow-down' },
    { path: '/in12', lines: ['제품검수'], icon: 'pi pi-check' },
  ];

  /* ===============================
     카드 렌더 함수
  =============================== */
  const renderCards = (menus, tabIndex) => (
  <div className="dashboard-card-grid">
    {menus.map((menu, idx) => {
      const isActive =
        checkedTabs[tabIndex] &&
        favoriteMenus[tabIndex] === menu.path;

      return (
        <Card
          key={menu.path ?? `action-${idx}`}
          className={classNames(
            'dashboard-card',
            isActive && 'dashboard-card--active'
          )}
          onClick={() => {
            if (checkedTabs[tabIndex] && menu.path) {
              setFavoriteMenus((prev) => ({
                ...prev,
                [tabIndex]: menu.path,
              }));
            }

           
            if (menu.onClick) {
              menu.onClick();
              return;
            }

           
            if (menu.path) {
              navigate(menu.path);
            }
          }}
        >
          <div className="dashboard-card-label">
            {menu.icon && (
              <i className={`${menu.icon} dashboard-card-icon`} />
            )}
            {menu.lines.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </Card>
      );
    })}
  </div>
);

  /* ===============================
     JSX
  =============================== */
  return (
    <div className="card height-full">
      <div className="hugreen_main flex flex-wrap">
        <div className="hugreen_wrap h-full">

          <TabView
            className="hugreen-main-tabview"
            activeIndex={activeIndex}
            onTabChange={(e) => setSearchParams({ tab: e.index })}
            scrollable
          >
            <TabPanel header="입고" />
            <TabPanel header="출고" />
            <TabPanel header="기타" />
          </TabView>

          {/*  임시 로그인 화면  - 실제구현시 다이얼로그구현 아님! */}
          <Dialog header="임시용 로그인화면임" appendTo={document.body} dismissableMask visible={visible} modal autoFocus={false} style={{ width: '100vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className='flex items-center justify-center h-full' >

              <section className="login-card w-full" aria-label="로그인" tabIndex={-1} ref={cardRef}>
                <div className="login-card__head">
                 

                  <h1 className="login-card__title">
                    {/*  
                     <div className="login-card__welcome">Welcome</div>
                     <img src="/pda/public/images/story_logo.png" style={{ width: "140px"}}/>
                     */}                    
                    <span className="login-card__title-bold">휴그린 <img
                      src="images/story_logo.png"
                      alt="휴그린"
                    /></span>
                    <br />
                    <span className="login-card__title-strong">건자재</span>
                    <span className="login-card__title-normal">바코드</span>
                    <br />
                    <span className="login-card__title-normal">시스템</span>
                  </h1>
                </div>

                <form className="login-card__form" onSubmit={onSubmit}>
                  <div className="login-card__field">
                    <span className="p-input-icon-left login-card__inputwrap">
                      
                      <InputText
                        className="login-card__input"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디를 입력해주세요"
                        autoComplete="username"
                      />
                    </span>
                  </div>

                  <div className="login-card__field">
                    <span className="p-input-icon-left login-card__inputwrap">
                      <i className="pi pi-lock" />
                      <Password
                        className="login-card__password"
                        inputClassName="login-card__input"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="패스워드를 입력해주세요"
                        toggleMask={false}
                        feedback={false}
                        autoComplete="current-password"
                      />
                    </span>
                  </div>

                  <Button
                    type="submit"
                    label="LOGIN"
                    className="login-card__submit"
                    disabled={isDisabled}
                  />

                  <div className="login-card__footer">
                    <div className="login-card__save">
                      <InputSwitch
                        checked={saveId}
                        onChange={(e) => setSaveId(e.value)}
                      />
                      <span className="login-card__save-text">아이디저장</span>
                    </div>

                    <span> Version 1.0</span>
                  </div>
                </form>
              </section>

            </div>
          </Dialog>


          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) =>
              setSearchParams({ tab: swiper.activeIndex })
            }
            className="h-full"
          >
            {[inMenus, outMenus, etcMenus].map((menus, idx) => (
              <SwiperSlide key={idx}>
                <div className="dashboard-fav-header">
                  <label className="text-gray-400 text-sm">
                    자주쓰는 메뉴를 고정해주세요
                  </label>
                  <InputSwitch
                    checked={checkedTabs[idx]}
                    onChange={(e) => {
                      setCheckedTabs((prev) => ({
                        ...prev,
                        [idx]: e.value,
                      }));

                      // OFF 시 해당 탭 활성 메뉴 해제
                      if (!e.value) {
                        setFavoriteMenus((prev) => ({
                          ...prev,
                          [idx]: null,
                        }));
                      }
                    }}
                  />
                </div>
                {renderCards(menus, idx)}
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
