import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
// import { ProductService } from '../service/ProductService';



const DashboardMain = (props) => {
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

       <div className="card">  
      
      
              {/* 공통 case01 : 검색영역 + 그리드 버튼 + 그리드영역 */}
              <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">
      
                <div className="hugreen_mobile_wrap">
                  <TabView className="hugreen-main-tabview" activeIndex={0}>
                      <TabPanel header="입고">
                          <div className="flex justify-center items-center w-full h-full">
                            <img src="/pda/images/main.png" alt="main" className="max-w-none"  />
                          </div>
                      </TabPanel>
                      <TabPanel header="출고">
                          <p className="m-0">
                              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                              ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                          </p>
                      </TabPanel>
                      <TabPanel header="기타">
                          <p className="m-0">
                              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                          </p>
                      </TabPanel>
                  </TabView>
                </div>
                 
      
                  
                  
      
      
                  
                 
      
      
              </div>      
          </div>
    </>
  );
};

export default DashboardMain;