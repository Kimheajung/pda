import React from 'react';
import { Link } from 'react-router-dom';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer" >
          <Link to={{ pathname: '/', search: '?tab=0' }}>
           <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-qrcode text-[20px]" />
                <span className="text-sm">입고</span>
            </button>
            </Link>
             <Link to={{ pathname: '/', search: '?tab=1' }}>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-truck text-[20px]"  />
                <span className="text-sm">출고</span>
            </button>
            </Link>
             <Link to={{ pathname: '/', search: '?tab=2' }}>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-tablet text-[20px]" />
                <span className="text-sm">기타</span>
            </button>
            </Link>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" onClick={props.onToggleMenuClick}>
                <i className="pi pi-ellipsis-h text-[20px]" />
                <span className="text-sm">더보기</span>
            </button>
        </div>
    );
}
