import React from 'react';
import { Link } from 'react-router-dom';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer" >
            <Link to="/" >
           <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-qrcode" />
                <span className="text-sm">입고</span>
            </button>
            </Link>
             <Link to="/" >
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-truck" />
                <span className="text-sm">출고</span>
            </button>
            </Link>
             <Link to="/" >
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <i className="pi pi-tablet" />
                <span className="text-sm">기타</span>
            </button>
            </Link>
             <Link to="/" >
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white">
                <i className="pi pi-ellipsis-h" />
                <span className="text-sm">더보기</span>
            </button>
             </Link>
        </div>
    );
}
