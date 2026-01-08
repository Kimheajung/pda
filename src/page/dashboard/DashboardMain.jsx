import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { useSearchParams } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';



const DashboardMain = (props) => {
  //메뉴

//탭 링크열기
  const [checked, setChecked] = useState(false);
const [searchParams, setSearchParams] = useSearchParams();
  const swiperRef = useRef(null);

  const tabParam = Number(searchParams.get('tab'));
  const safeIndex = [0, 1, 2].includes(tabParam) ? tabParam : 0;

  const [activeIndex, setActiveIndex] = useState(safeIndex);

  // URL → state
  useEffect(() => {
    setActiveIndex(safeIndex);
  }, [safeIndex]);

  // state → Swiper
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

const inMenus = [
  {path: '/in01', lines: ['자가생산 입고 (개별)'], icon: 'pi pi-file-import',},
  {path: '/in02', lines: ['외주생산 입고 (개별)'], icon: 'pi pi-inbox',},
  {path: '/in03', lines: ['반품입고'], icon: 'pi pi-shopping-cart',},
];
const outMenus = [
  { path: '/out04', lines: ['출고 등록'], icon: 'pi pi-car',},
  { path: '/out05', lines: ['출고 내역 조회'], icon: 'pi pi-desktop',},
];
const etcMenus = [
  { path: '/out06', lines: ['기타출고'], icon: 'pi pi-clipboard',},
  { path: '/out07', lines: ['재고변경'] , icon: 'pi pi-building',},
  { path: '/out08', lines: ['제고이동'], icon: 'pi pi-building',},
  { path: '/out09', lines: ['재고실사계획조회'] , icon: 'pi pi-briefcase',},
  { path: '/out10', lines: ['팔렛병합'] , icon: 'pi pi-cart-arrow-down',},
  { path: '/out11', lines: ['팔렛정보조회'] , icon: 'pi pi-cart-arrow-down',},
  { path: '/out12', lines: ['제품검수'], icon: 'pi pi-check',},
];

const navigate = useNavigate();



  return (
    
       <div className="card height-full">  
      
              {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
              <div className="hugreen_main  flex flex-wrap">
      
                <div className="hugreen_wrap h-full">
                  {/* 탭 헤더 */}
                  <TabView className="hugreen-main-tabview"
                      activeIndex={activeIndex}
                      onTabChange={(e) => setSearchParams({ tab: e.index })}
                      scrollable 
                    >
                    <TabPanel header="입고" />
                    <TabPanel header="출고" />
                    <TabPanel header="기타" />
                  </TabView>

                  {/* 스와이프 콘텐츠 */}
                 <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) =>
                      setSearchParams({ tab: swiper.activeIndex })
                    }  className='h-full' >
                    <SwiperSlide>
                       <div className="flex flex-wrap justify-between mb-2 w-full" style={{ padding: "0 1rem"}}>    
                          <label className='text-gray-400'>자주쓰는 메뉴를 고정해주세요</label>
                          <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />    
                        </div> 

                       {/* 카드 영역 */}
                        <div className="dashboard-card-grid">
                          {inMenus.map((menu, idx) => (
                            <Card
                              key={idx}
                              className="dashboard-card"
                              onClick={() => navigate(menu.path)}
                            >
                              <div className="dashboard-card-label">
                                {/* 아이콘 */}
                                {menu.icon && (
                                  <i className={`${menu.icon}`} />
                                )}

                                {/* 텍스트 */}
                                {menu.lines.map((text, i) => (
                                  <span key={i}>{text}</span>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>


                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex flex-wrap justify-between mb-2 w-full" style={{ padding: "0 1rem"}}>    
                          <label className='text-gray-400'>자주쓰는 메뉴를 고정해주세요</label>
                          <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />    
                        </div> 

                       {/* 카드 영역 */}
                        <div className="dashboard-card2-grid">
                          {outMenus.map((menu, idx) => (
                            <Card
                              key={idx}
                              className="dashboard-card"
                              onClick={() => navigate(menu.path)}
                            >
                              <div className="dashboard-card-label">
                                {/* 아이콘 */}
                                {menu.icon && (
                                  <i className={`${menu.icon}`} />
                                )}

                                {/* 텍스트 */}
                                {menu.lines.map((text, i) => (
                                  <span key={i}>{text}</span>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex flex-wrap justify-between mb-2 w-full" style={{ padding: "0 1rem"}}>    
                          <label className='text-gray-400'>자주쓰는 메뉴를 고정해주세요</label>
                          <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />    
                        </div> 

                       {/* 카드 영역 */}
                        <div className="dashboard-card-grid">
                          {etcMenus.map((menu, idx) => (
                            <Card
                              key={idx}
                              className="dashboard-card"
                              onClick={() => navigate(menu.path)}
                            >
                              <div className="dashboard-card-label">
                                {/* 아이콘 */}
                                {menu.icon && (
                                  <i className={`${menu.icon}`} />
                                )}

                                {/* 텍스트 */}
                                {menu.lines.map((text, i) => (
                                  <span key={i}>{text}</span>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>
                    </SwiperSlide>
                  </Swiper>
                  
                </div>
                 
              </div>      
          </div>
   
  );
};

export default DashboardMain;