import React from 'react';
import { Link } from 'react-router-dom';

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
             <Link to="/" >
                <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-home" />
                </button>
            </Link>
             <button
                type="button"
                className="p-link layout-menu-button text-white" >
                <i className="pi pi-tablet" />
            </button>
             <button
                type="button"
                className="p-link layout-menu-button text-white" onClick={props.onToggleMenuClick}>
                <i className="pi pi-ellipsis-h" />
            </button>
        </div>
    );
}
