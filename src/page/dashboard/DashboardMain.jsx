import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputSwitch } from 'primereact/inputswitch';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';


const DashboardMain = () => {
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
    { path: '', lines: [ '임시링크'],  },
    { path: '/layout01', lines: ['모바일가이드기준'], icon: 'pi pi-sparkles' },
    { path: '/LoginSample', lines: ['로그인'], icon: 'pi pi-sparkles'},
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
    {menus.map((menu) => {
      const isActive =
        checkedTabs[tabIndex] &&
        favoriteMenus[tabIndex] === menu.path;

      return (
        <Card
          key={menu.path}
          className={`dashboard-card ${
            isActive ? 'dashboard-card--active' : ''
          }`}
          onClick={() => {
            if (checkedTabs[tabIndex]) {
              setFavoriteMenus((prev) => ({
                ...prev,
                [tabIndex]: menu.path,
              }));
            }
            navigate(menu.path);
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
