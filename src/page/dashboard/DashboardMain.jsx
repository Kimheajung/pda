import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
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

      <div className="flex justify-center items-center w-full h-full">
        <img src="/pda/images/main.png" alt="main" className="max-w-none"  />
      </div>
    </>
  );
};

export default DashboardMain;