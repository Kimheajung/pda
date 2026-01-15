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


 const InSvgIcon = (
  <svg
    viewBox="0 0 64 64"
    className="dashboard-card-icon"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M8 6a2 2 0 1 0 0 4h48a2 2 0 1 0 0-4zM6 16a2 2 0 0 1 2-2h48a2 2 0 1 1 0 4H8a2 2 0 0 1-2-2zM8 22a2 2 0 1 0 0 4h48a2 2 0 1 0 0-4z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 30a6 6 0 0 0-6 6v16a6 6 0 0 0 6 6h48a6 6 0 0 0 6-6V36a6 6 0 0 0-6-6H41a2 2 0 0 0-2 2 7 7 0 1 1-14 0 2 2 0 0 0-2-2zm-2 6a2 2 0 0 1 2-2h13.181c.94 5.12 5.427 9 10.819 9s9.878-3.88 10.819-9H56a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"
    />
  </svg>
);

const LoginSvgIcon = (
  <svg
    viewBox="0 0 24 24"
    className="dashboard-card-icon"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z" />
  </svg>
);

  /*  메뉴 데이터 */
  const inMenus = [
    { path: '/in01', lines: ['자가생산 입고 (개별)'], icon: InSvgIcon, },
    { path: '/in02', lines: ['외주생산 입고 (개별)'], icon: LoginSvgIcon, },
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
              typeof menu.icon === 'string' ? (
                <i className={`${menu.icon} dashboard-card-icon`} />
              ) : (
                <span className="dashboard-card-icon-wrap">
                  {menu.icon}
                </span>
              )
            )}
            {menu.lines.map((text, i) => (
              <span key={i} style={{ fontSize: "1rem"}}>{text}</span>
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
            <div className='flex items-center justify-center h-full login-wrap' >

              <section className="login-card w-full" aria-label="로그인" tabIndex={-1} ref={cardRef}>
                <div className="login-card__head">
                  <h1 className="login-card__title">               
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
