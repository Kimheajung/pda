import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer" >
           <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-qrcode" />
            </button>
             <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-truck" />
            </button>
             <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-tablet" />
            </button>
             <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-ellipsis-h" />
            </button>
        </div>
    );
}
