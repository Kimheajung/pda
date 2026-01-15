import React from 'react';
import { Link } from 'react-router-dom';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer" >
          <Link to={{ pathname: '/', search: '?tab=0' }}>
           <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                <div className="footer-icon">
                <svg
                viewBox="0 0 100 100"
                    //className="w-9 h-9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <g transform="scale(0.13) translate(110.5 140.5)" >
                    <path d="M492.522 118.3 266.433 3.743l-.094-.047c-10.067-5.012-22.029-4.9-32.002.3L137.368 55.46c-.788.334-1.545.739-2.27 1.205L18.896 118.337C7.24 124.44 0 136.398 0 149.559V362.44c0 13.161 7.24 25.118 18.896 31.221l215.345 114.292.097.051a35.255 35.255 0 0 0 16.297 3.981 35.232 35.232 0 0 0 15.704-3.682l226.183-114.604C504.538 387.69 512 375.618 512 362.18V149.82c0-13.439-7.462-25.512-19.478-31.52zM248.237 30.569a5.26 5.26 0 0 1 4.705-.042l211.629 107.23-82.364 41.005L175.308 69.275l72.929-38.706zM235.424 474.63 32.91 367.147l-.097-.051a5.237 5.237 0 0 1-2.824-4.656V163.091l205.435 107.124V474.63zm15.153-230.335L46.272 137.76l97.024-51.493L349.171 195.21l-98.594 49.085zm231.432 117.883a5.22 5.22 0 0 1-2.911 4.703L265.414 475.152V270.408l98.386-48.982v51.355c0 8.281 6.714 14.995 14.995 14.995s14.995-6.714 14.995-14.995v-66.286l88.219-43.92v199.603z" />
                </g>
                </svg></div>

                <span className="text-sm">입고</span>
            </button>
            </Link>
             <Link to={{ pathname: '/', search: '?tab=1' }}>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col gap-1.5 items-center  text-white" >
                <div className="footer-icon">
               <svg
                viewBox="0 0 100 100"
                //className="w-11 h-11"
                //style={{ height: "31.5px"}}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 28.197A5.197 5.197 0 0 1 20.197 23h39.606a5.197 5.197 0 0 1 5.193 5h12.026c1.576 0 3.067.715 4.053 1.944l12.781 15.928A5.196 5.196 0 0 1 95 49.124v17.68A5.197 5.197 0 0 1 89.803 72h-5.177a8.504 8.504 0 0 1-16.252 0H44.868a8.503 8.503 0 0 1-16.736 0h-7.935A5.197 5.197 0 0 1 15 66.803v-4.99a2 2 0 0 1 4 0v4.99c0 .661.536 1.197 1.197 1.197h8.177a8.504 8.504 0 0 1 16.252 0H61V28.197c0-.661-.536-1.197-1.197-1.197H20.197c-.661 0-1.197.536-1.197 1.197v5.989a2 2 0 1 1-4 0zM65 51v17h3.132a8.503 8.503 0 0 1 16.736 0h4.935c.661 0 1.197-.536 1.197-1.197V51zm24.633-4H65V32h12.022c.363 0 .706.165.933.448zM8 42a2 2 0 0 1 2-2h15.192a2 2 0 1 1 0 4H10a2 2 0 0 1-2-2zm3 7a2 2 0 0 1 2-2h15.192a2 2 0 1 1 0 4H13a2 2 0 0 1-2-2zm-3 7a2 2 0 0 1 2-2h15.192a2 2 0 1 1 0 4H10a2 2 0 0 1-2-2zm68.5 9a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm-40 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
                />
                </svg></div>
                <span className="text-sm">출고</span>
            </button>
            </Link>
             <Link to={{ pathname: '/', search: '?tab=2' }}>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" >
                    <div className="footer-icon">
                    <svg
                    viewBox="0 0 100 100"
                    //className="w-9 h-9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <g transform="scale(1.0) translate(16.5 20.5)">
                    <path d="M8 6a2 2 0 1 0 0 4h48a2 2 0 1 0 0-4zM6 16a2 2 0 0 1 2-2h48a2 2 0 1 1 0 4H8a2 2 0 0 1-2-2zM8 22a2 2 0 1 0 0 4h48a2 2 0 1 0 0-4z" />
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 30a6 6 0 0 0-6 6v16a6 6 0 0 0 6 6h48a6 6 0 0 0 6-6V36a6 6 0 0 0-6-6H41a2 2 0 0 0-2 2 7 7 0 1 1-14 0 2 2 0 0 0-2-2zm-2 6a2 2 0 0 1 2-2h13.181c.94 5.12 5.427 9 10.819 9s9.878-3.88 10.819-9H56a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"
                    />
                    </g>
                </svg></div>
                <span className="text-sm">기타</span>
            </button>
            </Link>
             <button
                type="button"
                className="p-link layout-menu-button flex flex-col items-center gap-1.5 text-white" onClick={props.onToggleMenuClick}>
                    <div className="footer-icon">
                <i className="pi pi-ellipsis-h" style={{ fontSize: "20px"}} />
                </div>
                <span className="text-sm">더보기</span>
            </button>
        </div>
    );
}
