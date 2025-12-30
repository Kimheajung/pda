import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { useSearchParams } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';


const DashboardMain = (props) => {

//탭 링크열기
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

  return (
    <>
      {/* ← 하드코딩 CSS로 메인에만 적용 */}
      <style>
        {`
          /* PC(768px 이상)에서만 사이드바 제거 */
          @media (min-width: 768px) {
            .layout-sidebar {
              display: none !important;
              width: 0 !important;
            }

            .layout-main-container,
            .layout-main {
              margin-left: 0 !important;
              padding-left: 0 !important;
              width: 100% !important;
            }
          }
        `}
      </style>

       <div className="card_etc">  
      
      
              {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
              <div className="hugreen_main  flex flex-wrap">
      
                <div className="hugreen_wrap">
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
                    }
                    className='h-full'
                  >
                    <SwiperSlide>
                      <div className="flex justify-center items-center w-full h-full" >
                        <img src="/pda/images/main.png" alt="main" className="max-w-none"  />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex justify-center items-center w-full">
                       출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고
                       출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고
                       출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고
                       출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고
                       출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고출고
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex justify-center items-center w-full">
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                       기타기타기타기타기타기타기타기타기타기타기타기타기타기타기타
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  
                </div>
                 
      
                  
                  
      
      
                  
                 
      
      
              </div>      
          </div>
    </>
  );
};

export default DashboardMain;